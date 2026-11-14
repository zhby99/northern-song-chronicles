import { useMemo, useState } from 'react'
import {
  MARTIAL_ART_DB_MAP,
  NPC_DB_MAP,
  resolveNpcByName,
} from '../../data/gameDb'
import {
  BAG_CATEGORY_METAS,
  EQUIPMENT_SLOT_METAS,
  ITEM_DB_MAP,
  normalizeItemTier,
  RARITY_STYLE_MAP,
} from '../../data/itemsDb'
import { MARTIAL_ART_SLOT_METAS } from '../../data/playerMartialArts'
import { useGameStore } from '../../store/useGameStore'
import type { TenArtKey } from '../../types/game'
import { deriveNpcEffectiveStats } from '../../utils/heroStats'
import { CutoutPortraitImg } from '../common/CutoutPortraitImg'

const CATEGORY_LABEL_MAP: Record<string, string> = Object.fromEntries(
  BAG_CATEGORY_METAS.map((m) => [m.key, m.label]),
)

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

  const dbRecord = useMemo(() => {
    if (!npc) return undefined
    if (npc.id && NPC_DB_MAP[npc.id]) return NPC_DB_MAP[npc.id]
    return (
      resolveNpcByName(npc.name) ??
      resolveNpcByName(npc.name.replace(/大师$/, ''))
    )
  }, [npc])

  const portraitUrl =
    dbRecord?.fullbodyUrl ??
    dbRecord?.templateUrl ??
    '/assets/characters/templates/tpl_song_scholar_fb.jpg'

  const stats = dbRecord?.stats ?? npc?.stats
  const talents = dbRecord?.talents ?? npc?.talents
  const tenArts = dbRecord?.tenArts ?? npc?.tenArts
  const factionName = dbRecord?.factionName ?? npc?.factionName ?? '江湖散人'
  const roleName = dbRecord?.role ?? npc?.title ?? ''
  const realmName = dbRecord?.realm ?? npc?.realm ?? '不入流'
  const bio = dbRecord?.bio

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
      {/* 轻薄暗角遮罩：完整保留当前地区/建筑背景，仅在底部衬托对话与交互按钮 */}
      <div
        className="absolute inset-0 bg-gradient-to-t from-[#120c07]/76 via-transparent to-[#120c07]/12 transition-opacity"
        onClick={closeNpcInteraction}
      />

      {/* 已剥离立绘背景的人物主体：独立层固定在当前场景前，展开子面板时平滑左移并排展示 */}
      <div
        className={`absolute inset-x-0 top-12 bottom-28 z-10 flex items-end justify-center pointer-events-none transition-transform duration-300 ${
          subPanel !== 'none' ? 'lg:-translate-x-[21vw]' : ''
        }`}
      >
        <div
          className="relative h-full max-w-[90vw] flex items-end justify-center"
          style={{
            filter: 'drop-shadow(0 14px 28px rgba(0, 0, 0, 0.75))',
          }}
        >
          <CutoutPortraitImg
            url={portraitUrl}
            alt={npc.name}
            className="max-h-full w-auto object-contain"
          />
        </div>
      </div>

      {/* 子面板：人物面板（各个维度数值、武学情况、披挂情况） */}
      {subPanel === 'panel' && (
        <div className="relative z-20 w-[min(92vw,680px)] lg:self-end lg:mr-10 max-h-[60vh] mb-3 rounded-xl bg-[#f7eedc]/97 border-2 border-[#8c6e46] shadow-2xl overflow-hidden flex flex-col">
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
            {stats && talents && (() => {
              const eff = dbRecord ? deriveNpcEffectiveStats(dbRecord) : null
              return (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div className="p-2.5 rounded bg-[#efe4cc]/80 border border-[#cbb693] space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-[#5c3d1e] song-serif">实战交锋属性</span>
                      <span className="text-[10px] text-[#7a5f3e]">武学+披挂实时派生</span>
                    </div>
                    <div className="grid grid-cols-3 gap-1.5 text-center font-mono">
                      <div className="bg-[#faf3e3] rounded py-1 border border-[#dcc9a7]">
                        <span className="block text-[10px] text-[#6b5235]">气血</span>
                        <strong className="text-[#8f1d14] text-sm">{eff ? eff.maxHp : stats.hp}</strong>
                      </div>
                      <div className="bg-[#faf3e3] rounded py-1 border border-[#dcc9a7]">
                        <span className="block text-[10px] text-[#6b5235]">内力</span>
                        <strong className="text-[#1d473a] text-sm">{eff ? eff.maxMp : stats.mp}</strong>
                      </div>
                      <div className="bg-[#faf3e3] rounded py-1 border border-[#dcc9a7]">
                        <span className="block text-[10px] text-[#6b5235]">身法</span>
                        <strong className="text-sm">{eff ? eff.agility : stats.agi}</strong>
                      </div>
                      <div className="bg-[#faf3e3] rounded py-1 border border-[#dcc9a7]">
                        <span className="block text-[10px] text-[#6b5235]">抗性</span>
                        <strong className="text-sm">{eff ? eff.res : stats.res}</strong>
                      </div>
                      <div className="bg-[#faf3e3] rounded py-1 border border-[#dcc9a7]">
                        <span className="block text-[10px] text-[#6b5235]">外功杀伤</span>
                        <strong className="text-[#8f1d14] text-sm">+{eff ? eff.totalAttack : 0}</strong>
                      </div>
                      <div className="bg-[#faf3e3] rounded py-1 border border-[#dcc9a7]">
                        <span className="block text-[10px] text-[#6b5235]">护体防御</span>
                        <strong className="text-[#1b5132] text-sm">+{eff ? eff.totalDefense : 0}</strong>
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
              )
            })()}

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

            {/* 武学情况（6槽）与披挂情况（7槽） */}
            {dbRecord && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="p-2.5 rounded bg-[#efe4cc]/80 border border-[#cbb693] space-y-1.5">
                  <div className="font-bold text-[#5c3d1e] song-serif">六槽运使武学</div>
                  <div className="space-y-1">
                    {MARTIAL_ART_SLOT_METAS.map((meta) => {
                      const aid = dbRecord.equippedArts[meta.slot]
                      const art = aid ? MARTIAL_ART_DB_MAP[aid] : null
                      const lv =
                        dbRecord.learnedArts.find((e) => e.artId === aid)?.level ?? 1
                      return (
                        <div
                          key={meta.slot}
                          className="px-2 py-1 rounded bg-[#faf3e3] border border-[#dcc9a7] flex items-center justify-between gap-2"
                        >
                          <div className="flex items-center gap-1.5 min-w-0">
                            <span className="px-1 py-0.2 rounded bg-[#5e472d] text-[#fff8eb] text-[9px] font-bold shrink-0">
                              {meta.shortLabel}
                            </span>
                            <span className="font-bold text-[#2d1e10] truncate">
                              {art ? art.cleanName : '未装配'}
                            </span>
                          </div>
                          {art && (
                            <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-[#e5d3b3] text-[#781710] shrink-0">
                              {art.tier}·{lv}重
                            </span>
                          )}
                        </div>
                      )
                    })}
                  </div>
                </div>

                <div className="p-2.5 rounded bg-[#efe4cc]/80 border border-[#cbb693] space-y-1.5">
                  <div className="font-bold text-[#5c3d1e] song-serif">七槽随身披挂</div>
                  <div className="space-y-1">
                    {EQUIPMENT_SLOT_METAS.map((meta) => {
                      const iid = dbRecord.equipped[meta.slot]
                      const item = iid ? ITEM_DB_MAP[iid] : null
                      const tier = item ? normalizeItemTier(item.rarity) : null
                      const rStyle = tier ? RARITY_STYLE_MAP[tier] : null
                      return (
                        <div
                          key={meta.slot}
                          className="px-2 py-1 rounded bg-[#faf3e3] border border-[#dcc9a7] flex items-center justify-between gap-2"
                        >
                          <div className="flex items-center gap-1.5 min-w-0">
                            <span className="px-1 py-0.2 rounded bg-[#6b5235] text-[#fff8eb] text-[9px] font-bold shrink-0">
                              {meta.shortLabel}
                            </span>
                            <span className="font-medium text-[#2d1e10] truncate">
                              {item ? item.name : '空置'}
                            </span>
                          </div>
                          {tier && rStyle && (
                            <span
                              className={`text-[9px] px-1.5 py-0.2 rounded font-bold shrink-0 ${rStyle.badgeBg} ${rStyle.badgeText}`}
                            >
                              {tier}
                            </span>
                          )}
                        </div>
                      )
                    })}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* 子面板：送礼行囊选择 */}
      {subPanel === 'gift' && (
        <div className="relative z-20 w-[min(92vw,560px)] lg:self-end lg:mr-10 max-h-[52vh] mb-3 rounded-xl bg-[#f7eedc]/97 border-2 border-[#8c6e46] shadow-2xl overflow-hidden flex flex-col">
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
                      {CATEGORY_LABEL_MAP[item.category] ?? item.category} · {item.rarity}
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
