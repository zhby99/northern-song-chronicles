import { useMemo, useState } from 'react'
import {
  MARTIAL_ART_DB_MAP,
  NPC_DB_MAP,
  UNIQUE_ARTIFACT_MAP,
} from '../../data/gameDb'
import { ITEM_DB_MAP } from '../../data/itemsDb'
import { useGameStore } from '../../store/useGameStore'
import type { TenArtKey } from '../../types/game'
import { ManagedAssetImg } from '../common/ManagedAssetImg'

const TEN_ART_KEYS: TenArtKey[] = [
  '骑术',
  '算术',
  '经义',
  '策论',
  '诗词',
  '琴',
  '棋',
  '书',
  '画',
  '辩才',
]

type SubPanelMode = 'none' | 'panel' | 'gift'

export function NpcInteractionOverlay() {
  const npc = useGameStore((s) => s.activeNpcInteraction)
  const closeNpcInteraction = useGameStore((s) => s.closeNpcInteraction)
  const interactNpc = useGameStore((s) => s.interactNpc)
  const giftNpcItem = useGameStore((s) => s.giftNpcItem)
  const inventory = useGameStore((s) => s.inventory)
  const actionFeedback = useGameStore((s) => s.actionFeedback)

  const [subPanel, setSubPanel] = useState<SubPanelMode>('none')
  const [dialogueText, setDialogueText] = useState<string | null>(null)

  const dbRecord = useMemo(
    () => (npc?.id ? NPC_DB_MAP[npc.id] : undefined),
    [npc?.id],
  )

  const portraitUrl =
    dbRecord?.fullbodyUrl ?? dbRecord?.templateUrl ?? npc?.avatarUrl ?? null

  const stats = dbRecord?.stats ?? npc?.stats
  const talents = dbRecord?.talents ?? npc?.talents
  const tenArts = dbRecord?.tenArts ?? npc?.tenArts
  const factionName = dbRecord?.factionName ?? npc?.factionName ?? '江湖散人'
  const roleName = dbRecord?.role ?? npc?.title ?? ''
  const realmName = dbRecord?.realm ?? npc?.realm ?? '不入流'
  const bio = dbRecord?.bio

  const knownArts = useMemo(() => {
    if (!dbRecord?.knownArtIds?.length) return []
    return dbRecord.knownArtIds
      .map((id) => MARTIAL_ART_DB_MAP[id])
      .filter((a): a is NonNullable<typeof a> => Boolean(a))
  }, [dbRecord])

  const ownedArtifacts = useMemo(() => {
    if (!dbRecord?.ownedArtifactIds?.length) return []
    return dbRecord.ownedArtifactIds
      .map((id) => {
        const unique = UNIQUE_ARTIFACT_MAP[id]
        const item = ITEM_DB_MAP[id]
        if (item) {
          return {
            id,
            name: item.name,
            category: item.category,
            tier: item.rarity,
            desc: item.desc,
          }
        }
        if (unique) {
          return {
            id,
            name: unique.itemName,
            category: unique.categoryLabel,
            tier: unique.tier,
            desc: unique.note,
          }
        }
        return null
      })
      .filter((x): x is NonNullable<typeof x> => Boolean(x))
  }, [dbRecord])

  const giftableItems = useMemo(() => {
    return inventory
      .filter((st) => st.qty > 0 && Boolean(ITEM_DB_MAP[st.itemId]))
      .map((st) => ({
        stack: st,
        item: ITEM_DB_MAP[st.itemId]!,
      }))
  }, [inventory])

  if (!npc) return null

  const handleTalk = () => {
    setSubPanel('none')
    interactNpc(npc, 'talk')
    setDialogueText(npc.talk || bio || `${npc.name}微微颔首，示意少侠有礼了。`)
  }

  const handleArt = () => {
    setSubPanel('none')
    interactNpc(npc, 'art')
    setDialogueText(null)
  }

  const handleSpar = () => {
    setSubPanel('none')
    interactNpc(npc, 'spar')
    setDialogueText(null)
  }

  const handleTogglePanel = () => {
    setSubPanel((prev) => (prev === 'panel' ? 'none' : 'panel'))
  }

  const handleToggleGift = () => {
    setSubPanel((prev) => (prev === 'gift' ? 'none' : 'gift'))
  }

  const handleGift = (itemId: string) => {
    giftNpcItem(npc, itemId)
    setSubPanel('none')
    setDialogueText(null)
  }

  const activeMessage = dialogueText ?? actionFeedback?.text ?? npc.talk

  return (
    <div
      className="fixed inset-0 z-35 pointer-events-auto flex flex-col justify-end items-center select-none"
      role="dialog"
      aria-label={`${npc.name}交互`}
    >
      {/* 半透明暗角遮罩：保留当前建筑/地区背景透出，突出立绘人物 */}
      <div
        className="absolute inset-0 bg-gradient-to-t from-[#120c07]/90 via-[#120c07]/25 to-[#120c07]/45 transition-opacity"
        onClick={closeNpcInteraction}
      />

      {/* 抠图感全身立绘：羽化边缘融入当前场景背景 */}
      <div className="relative z-10 flex-1 w-full flex items-end justify-center pointer-events-none overflow-hidden pb-24">
        {portraitUrl ? (
          <div
            className="relative max-h-[82vh] max-w-[90vw] flex items-end justify-center"
            style={{
              WebkitMaskImage:
                'radial-gradient(ellipse 68% 82% at 50% 46%, rgba(0,0,0,1) 48%, rgba(0,0,0,0.65) 72%, rgba(0,0,0,0) 96%)',
              maskImage:
                'radial-gradient(ellipse 68% 82% at 50% 46%, rgba(0,0,0,1) 48%, rgba(0,0,0,0.65) 72%, rgba(0,0,0,0) 96%)',
              filter: 'drop-shadow(0 20px 38px rgba(0, 0, 0, 0.85))',
            }}
          >
            <ManagedAssetImg
              url={portraitUrl}
              alt={npc.name}
              className="max-h-[78vh] w-auto object-contain rounded-t-2xl"
            />
          </div>
        ) : (
          <div className="mb-12 w-44 h-64 rounded-2xl bg-[#3a2614]/85 border-2 border-[#c8a97e]/60 flex flex-col items-center justify-center shadow-2xl">
            <span className="text-6xl song-serif font-bold text-[#f5dfb5]">
              {npc.name.slice(0, 1)}
            </span>
            <span className="mt-3 text-xs text-[#d6be96]">{npc.title}</span>
          </div>
        )}
      </div>

      {/* 子面板：人物面板（各个维度数值、武学情况、披挂情况） */}
      {subPanel === 'panel' && (
        <div className="relative z-20 w-[min(92vw,760px)] max-h-[62vh] mb-3 rounded-xl bg-[#f7eedc]/97 border-2 border-[#8c6e46] shadow-2xl overflow-hidden flex flex-col">
          <div className="px-4 py-2.5 bg-[#3d2814] text-[#f5dfb5] flex items-center justify-between border-b border-[#8c6e46]">
            <div className="flex items-center gap-2.5">
              <span className="text-base font-bold song-serif">{npc.name}</span>
              <span className="text-xs px-2 py-0.5 rounded bg-[#6b4823] text-[#fde8c8]">
                {roleName}
              </span>
              <span className="text-xs px-2 py-0.5 rounded bg-[#781710] text-[#fff3df]">
                {realmName}
              </span>
              <span className="text-xs text-[#d6be96]">{factionName}</span>
            </div>
            <button
              type="button"
              onClick={() => setSubPanel('none')}
              className="text-xs px-2 py-0.5 rounded bg-[#5c3d1e] hover:bg-[#785129] text-[#f5dfb5] cursor-pointer"
            >
              收起
            </button>
          </div>

          <div className="p-4 overflow-y-auto scroll-thin space-y-4 text-xs text-[#2d1e10]">
            {bio && (
              <p className="px-3 py-2 rounded bg-[#efe4cc] border border-[#cbb693] text-[#4a3219] leading-relaxed">
                {bio}
              </p>
            )}

            {/* 各个维度数值 */}
            {stats && talents && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="p-2.5 rounded bg-[#efe4cc]/80 border border-[#cbb693] space-y-1.5">
                  <div className="font-bold text-[#5c3d1e] song-serif">四维实战属性</div>
                  <div className="grid grid-cols-4 gap-1.5 text-center font-mono">
                    <div className="bg-[#faf3e3] rounded py-1 border border-[#dcc9a7]">
                      <span className="block text-[10px] text-[#6b5235]">气血</span>
                      <strong className="text-[#8f1d14] text-sm">{stats.hp}</strong>
                    </div>
                    <div className="bg-[#faf3e3] rounded py-1 border border-[#dcc9a7]">
                      <span className="block text-[10px] text-[#6b5235]">内力</span>
                      <strong className="text-[#1d473a] text-sm">{stats.mp}</strong>
                    </div>
                    <div className="bg-[#faf3e3] rounded py-1 border border-[#dcc9a7]">
                      <span className="block text-[10px] text-[#6b5235]">身法</span>
                      <strong className="text-sm">{stats.agi}</strong>
                    </div>
                    <div className="bg-[#faf3e3] rounded py-1 border border-[#dcc9a7]">
                      <span className="block text-[10px] text-[#6b5235]">抗性</span>
                      <strong className="text-sm">{stats.res}</strong>
                    </div>
                  </div>
                </div>

                <div className="p-2.5 rounded bg-[#efe4cc]/80 border border-[#cbb693] space-y-1.5">
                  <div className="font-bold text-[#5c3d1e] song-serif">先天三维禀赋</div>
                  <div className="grid grid-cols-3 gap-1.5 text-center font-mono">
                    <div className="bg-[#faf3e3] rounded py-1 border border-[#dcc9a7]">
                      <span className="block text-[10px] text-[#6b5235]">先天根骨</span>
                      <strong className="text-[#781710] text-sm">{talents.bone}</strong>
                    </div>
                    <div className="bg-[#faf3e3] rounded py-1 border border-[#dcc9a7]">
                      <span className="block text-[10px] text-[#6b5235]">先天悟性</span>
                      <strong className="text-[#1f4d3b] text-sm">{talents.comprehension}</strong>
                    </div>
                    <div className="bg-[#faf3e3] rounded py-1 border border-[#dcc9a7]">
                      <span className="block text-[10px] text-[#6b5235]">风姿颜值</span>
                      <strong className="text-[#6d3b1a] text-sm">{talents.charm}</strong>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* 十艺百工 */}
            {tenArts && (
              <div className="p-2.5 rounded bg-[#efe4cc]/80 border border-[#cbb693] space-y-1.5">
                <div className="font-bold text-[#5c3d1e] song-serif">十艺百工</div>
                <div className="grid grid-cols-5 sm:grid-cols-10 gap-1 text-center font-mono">
                  {TEN_ART_KEYS.map((artKey) => {
                    const val = tenArts[artKey] ?? 0
                    return (
                      <div
                        key={artKey}
                        className={`rounded py-1 border ${
                          val >= 80
                            ? 'bg-[#f4e1c1] border-[#c58b38] text-[#781710] font-bold'
                            : 'bg-[#faf3e3] border-[#dcc9a7] text-[#3d2b19]'
                        }`}
                      >
                        <span className="block text-[10px] text-[#6b5235] font-sans">
                          {artKey}
                        </span>
                        <span>{val}</span>
                      </div>
                    )
                  })}
                </div>
              </div>
            )}

            {/* 武学情况与披挂情况 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="p-2.5 rounded bg-[#efe4cc]/80 border border-[#cbb693] space-y-1.5">
                <div className="font-bold text-[#5c3d1e] song-serif">
                  武学情况 ({knownArts.length})
                </div>
                {knownArts.length > 0 ? (
                  <div className="space-y-1.5 max-h-36 overflow-y-auto scroll-thin pr-1">
                    {knownArts.map((art) => (
                      <div
                        key={art.id}
                        className="px-2 py-1.5 rounded bg-[#faf3e3] border border-[#dcc9a7] flex items-center justify-between gap-2"
                      >
                        <div className="min-w-0">
                          <div className="font-bold text-[#2d1e10] truncate">
                            {art.name}
                          </div>
                          <div className="text-[10px] text-[#6b5235] truncate">
                            {art.category} · {art.origin || '江湖'}
                          </div>
                        </div>
                        <span className="text-[10px] px-1.5 py-0.5 rounded bg-[#e5d3b3] text-[#781710] shrink-0">
                          {art.tier}
                        </span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="px-2 py-2 rounded bg-[#faf3e3] border border-[#dcc9a7] text-[#6b5235]">
                    {dbRecord?.artsText ? `专擅：${dbRecord.artsText}` : '未载录独门武学'}
                  </div>
                )}
              </div>

              <div className="p-2.5 rounded bg-[#efe4cc]/80 border border-[#cbb693] space-y-1.5">
                <div className="font-bold text-[#5c3d1e] song-serif">
                  披挂情况 ({ownedArtifacts.length})
                </div>
                {ownedArtifacts.length > 0 ? (
                  <div className="space-y-1.5 max-h-36 overflow-y-auto scroll-thin pr-1">
                    {ownedArtifacts.map((art) => (
                      <div
                        key={art.id}
                        className="px-2 py-1.5 rounded bg-[#faf3e3] border border-[#dcc9a7]"
                      >
                        <div className="flex items-center justify-between gap-2">
                          <span className="font-bold text-[#2d1e10]">{art.name}</span>
                          <span className="text-[10px] px-1.5 py-0.5 rounded bg-[#e5d3b3] text-[#4a3219]">
                            {art.category} · {art.tier}
                          </span>
                        </div>
                        {art.desc && (
                          <p className="text-[10px] text-[#6b5235] mt-0.5 line-clamp-2">
                            {art.desc}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="px-2 py-2 rounded bg-[#faf3e3] border border-[#dcc9a7] text-[#6b5235]">
                    随身常服，未携传世神兵名器
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 子面板：送礼行囊选择 */}
      {subPanel === 'gift' && (
        <div className="relative z-20 w-[min(92vw,560px)] max-h-[46vh] mb-3 rounded-xl bg-[#f7eedc]/97 border-2 border-[#8c6e46] shadow-2xl overflow-hidden flex flex-col">
          <div className="px-4 py-2 bg-[#3d2814] text-[#f5dfb5] flex items-center justify-between border-b border-[#8c6e46]">
            <span className="text-sm font-bold song-serif">
              向【{npc.name}】赠礼（择一行囊物什）
            </span>
            <button
              type="button"
              onClick={() => setSubPanel('none')}
              className="text-xs px-2 py-0.5 rounded bg-[#5c3d1e] hover:bg-[#785129] text-[#f5dfb5] cursor-pointer"
            >
              取消
            </button>
          </div>
          <div className="p-3 overflow-y-auto scroll-thin grid grid-cols-1 sm:grid-cols-2 gap-2">
            {giftableItems.length === 0 ? (
              <div className="col-span-full py-6 text-center text-xs text-[#6b5235]">
                行囊空空如也，暂无可赠之物。
              </div>
            ) : (
              giftableItems.map(({ stack, item }) => (
                <button
                  key={stack.itemId}
                  type="button"
                  onClick={() => handleGift(stack.itemId)}
                  className="text-left p-2 rounded bg-[#efe4cc] hover:bg-[#e5d3b3] border border-[#cbb693] transition-colors cursor-pointer flex items-center justify-between gap-2"
                >
                  <div className="min-w-0">
                    <div className="text-xs font-bold text-[#2d1e10] truncate">
                      {item.name}
                    </div>
                    <div className="text-[10px] text-[#6b5235] truncate">
                      {item.category} · {item.rarity}
                    </div>
                  </div>
                  <span className="text-[11px] font-mono px-1.5 py-0.5 rounded bg-[#faf3e3] border border-[#dcc9a7] text-[#4a3219] shrink-0">
                    ×{stack.qty}
                  </span>
                </button>
              ))
            )}
          </div>
        </div>
      )}

      {/* 底部名牌与对话栏 + 交互按钮 */}
      <div className="relative z-20 w-[min(94vw,760px)] mb-5 space-y-2.5">
        {/* 对话与反馈框 */}
        <div className="px-4 py-3 rounded-xl bg-[#1e140c]/92 border border-[#b59461]/70 shadow-2xl backdrop-blur-sm">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-base font-bold song-serif text-[#f5dfb5]">
              {npc.name}
            </span>
            <span className="text-[11px] px-1.5 py-0.5 rounded bg-[#5c3d1e] text-[#fde8c8]">
              {npc.title}
            </span>
            <span className="text-[11px] px-1.5 py-0.5 rounded bg-[#781710] text-[#fff3df]">
              {realmName}
            </span>
            <span className="text-[11px] text-[#cbb693] ml-auto">{factionName}</span>
          </div>
          <p className="text-xs sm:text-sm text-[#efe4cc] leading-relaxed">
            {activeMessage}
          </p>
        </div>

        {/* 下方交互按钮栏 */}
        <div className="flex flex-wrap items-center justify-center gap-2">
          <button
            type="button"
            onClick={handleTogglePanel}
            className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-medium border shadow-md transition-colors cursor-pointer ${
              subPanel === 'panel'
                ? 'bg-[#8f1d14] border-[#d49a6a] text-[#fff8ee]'
                : 'bg-[#3d2814]/95 hover:bg-[#54371c] border-[#b59461] text-[#f5dfb5]'
            }`}
          >
            人物面板
          </button>
          <button
            type="button"
            onClick={handleTalk}
            className="px-4 py-2 rounded-lg text-xs sm:text-sm font-medium bg-[#3d2814]/95 hover:bg-[#54371c] border border-[#b59461] text-[#f5dfb5] shadow-md transition-colors cursor-pointer"
          >
            交谈
          </button>
          <button
            type="button"
            onClick={handleToggleGift}
            className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-medium border shadow-md transition-colors cursor-pointer ${
              subPanel === 'gift'
                ? 'bg-[#8f1d14] border-[#d49a6a] text-[#fff8ee]'
                : 'bg-[#3d2814]/95 hover:bg-[#54371c] border-[#b59461] text-[#f5dfb5]'
            }`}
          >
            送礼
          </button>
          <button
            type="button"
            onClick={handleSpar}
            className="px-4 py-2 rounded-lg text-xs sm:text-sm font-medium bg-[#781710]/95 hover:bg-[#961f16] border border-[#d49a6a] text-[#fff8ee] shadow-md transition-colors cursor-pointer"
          >
            挑战
          </button>
          <button
            type="button"
            onClick={handleArt}
            className="px-4 py-2 rounded-lg text-xs sm:text-sm font-medium bg-[#3d2814]/95 hover:bg-[#54371c] border border-[#b59461] text-[#f5dfb5] shadow-md transition-colors cursor-pointer"
          >
            唱和
          </button>
          <button
            type="button"
            onClick={closeNpcInteraction}
            className="px-4 py-2 rounded-lg text-xs sm:text-sm font-medium bg-[#1e140c]/90 hover:bg-[#2d1e12] border border-[#8c6e46] text-[#d6be96] shadow-md transition-colors cursor-pointer"
          >
            告辞
          </button>
        </div>
      </div>
    </div>
  )
}
