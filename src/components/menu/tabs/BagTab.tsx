import { useMemo } from 'react'
import { MARTIAL_ART_DB_MAP } from '../../../data/gameDb'
import {
  BAG_CATEGORY_METAS,
  formatBonusBadges,
  ITEM_DB_MAP,
  RARITY_STYLE_MAP,
  type TreasureVolumeKey,
} from '../../../data/itemsDb'
import { useGameStore } from '../../../store/useGameStore'
import type {
  BagCategoryKey,
  CompiledMartialArtRecord,
  EquipmentSlotKey,
  GameItemDef,
} from '../../../types/game'
import { BagCatIcon, SlotIcon } from '../MenuIcons'

interface BagTabProps {
  selectedBagItemId: string | null
  onSelectBagItemId: (itemId: string | null) => void
  onOpenTreasureVolume: (vol: TreasureVolumeKey) => void
  onJumpToMartialArt: (art: CompiledMartialArtRecord) => void
  onJumpToEquipSlot: (slot: EquipmentSlotKey) => void
  onJumpToPracticeArt: (artId: string) => void
}

export function BagTab({
  selectedBagItemId,
  onSelectBagItemId,
  onOpenTreasureVolume,
  onJumpToMartialArt,
  onJumpToEquipSlot,
  onJumpToPracticeArt,
}: BagTabProps) {
  const silver = useGameStore((s) => s.silver)
  const food = useGameStore((s) => s.food)
  const inventory = useGameStore((s) => s.inventory)
  const learnedArts = useGameStore((s) => s.learnedArts)
  const activeBagCategory = useGameStore((s) => s.activeBagCategory)

  const replenishSupplies = useGameStore((s) => s.replenishSupplies)
  const setBagCategory = useGameStore((s) => s.setBagCategory)
  const openCompendium = useGameStore((s) => s.openCompendium)
  const equipItemToSlot = useGameStore((s) => s.equipItemToSlot)
  const consumeInventoryItem = useGameStore((s) => s.consumeInventoryItem)

  const learnedMap = useMemo(() => {
    const m = new Map<string, { level: number; exp: number }>()
    for (const e of learnedArts) {
      m.set(e.artId, { level: e.level, exp: e.exp })
    }
    return m
  }, [learnedArts])

  const bagItemsByCat = useMemo(() => {
    const counts: Record<BagCategoryKey, number> = {
      scrolls: 0,
      medicine: 0,
      tools: 0,
      misc: 0,
    }
    const list: Array<{ itemId: string; qty: number; def: GameItemDef }> = []
    for (const st of inventory) {
      const def = ITEM_DB_MAP[st.itemId]
      if (!def) continue
      counts[def.category] += 1
      if (def.category === activeBagCategory) {
        list.push({ itemId: st.itemId, qty: st.qty, def })
      }
    }
    return { counts, list }
  }, [inventory, activeBagCategory])

  const currentCatMeta =
    BAG_CATEGORY_METAS.find((c) => c.key === activeBagCategory) ?? BAG_CATEGORY_METAS[0]
  const displayList = bagItemsByCat.list
  const activeStack =
    displayList.find((x) => x.itemId === selectedBagItemId) ?? displayList[0] ?? null

  return (
    <div className="space-y-4 text-xs sm:text-sm">
      {/* 顶部资粮通栏：随身纹银 + 行军粮草补给 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
        <div className="p-3.5 rounded bg-[#efe4cc] border border-[#c8b28e] flex items-center justify-between">
          <div>
            <div className="text-[#6b5033] font-bold song-serif text-sm">随身资金（纹银）</div>
            <div className="text-xs text-[#7a6042] mt-0.5">
              可于各州衙门揭榜领赏或市易行交易获取
            </div>
          </div>
          <span className="font-mono font-bold text-xl text-[#7f1d1d]">{silver} 两</span>
        </div>

        <div className="p-3.5 rounded bg-[#efe4cc] border border-[#c8b28e] flex items-center justify-between">
          <div>
            <div className="text-[#6b5033] font-bold song-serif text-sm">行军粮草（干粮）</div>
            <div className="text-xs text-[#7a6042] mt-0.5">
              大地图远征与野外扎营闭关每日消耗 1 份干粮
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="font-mono font-bold text-xl text-[#1e4620]">{food} 日份</span>
            <button
              type="button"
              onClick={replenishSupplies}
              className="px-3 py-1.5 rounded bg-[#1f5c3a] hover:bg-[#277048] text-[#fff8eb] font-bold song-serif text-xs cursor-pointer transition shadow-sm"
            >
              购粮 (+20份/5两)
            </button>
          </div>
        </div>
      </div>

      {/* 四大分类切换页签（仅显示少侠随身持有的行囊物品） */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
        {BAG_CATEGORY_METAS.map((cat) => {
          const isAct = cat.key === activeBagCategory
          const count = bagItemsByCat.counts[cat.key]
          return (
            <button
              key={cat.key}
              type="button"
              onClick={() => {
                setBagCategory(cat.key)
                onSelectBagItemId(null)
              }}
              className={`p-3 rounded-md border-2 text-left transition cursor-pointer flex items-center justify-between ${
                isAct
                  ? 'bg-[#8f1d14] text-[#fff8eb] border-[#f5cb5c] shadow-md'
                  : 'bg-[#efe4cc] hover:bg-[#e5d6b8] text-[#2b1a0e] border-[#c8b28e]'
              }`}
            >
              <div className="flex items-center gap-2.5 min-w-0">
                <span
                  className={`w-8 h-8 rounded flex items-center justify-center shrink-0 ${
                    isAct
                      ? 'bg-[#6b140d] text-amber-200 border border-amber-300/50'
                      : 'bg-[#faf3e3] text-[#5c4024] border border-[#bfa680]'
                  }`}
                >
                  <BagCatIcon category={cat.key} className="w-4 h-4" />
                </span>
                <div className="truncate">
                  <div className="song-serif font-bold text-sm truncate">{cat.label}</div>
                  <div className={`text-[11px] ${isAct ? 'text-amber-200/90' : 'text-[#6b5235]'}`}>
                    四库卷{cat.numeral} · 随身行囊
                  </div>
                </div>
              </div>
              <span
                className={`px-2 py-0.5 rounded font-mono text-xs font-bold ${
                  isAct ? 'bg-black/30 text-amber-200' : 'bg-[#faf3e3] text-[#52391e]'
                }`}
              >
                {count}
              </span>
            </button>
          )
        })}
      </div>

      {/* 当前分类说明条 + 跳转至顶部独立【图鉴】菜单快捷入口 */}
      <div className="px-3.5 py-2.5 rounded bg-[#efe4cc] border border-[#c8b28e] flex flex-wrap items-center justify-between gap-2 text-xs text-[#52391e]">
        <span>
          <strong>【{currentCatMeta.label}】</strong>：{currentCatMeta.subtitle}
        </span>
        <div className="flex items-center gap-2.5">
          <span className="font-mono">随身持有 {displayList.length} 种物品</span>
          {activeBagCategory === 'scrolls' ||
          activeBagCategory === 'medicine' ||
          activeBagCategory === 'tools' ? (
            <button
              type="button"
              onClick={() => onOpenTreasureVolume(activeBagCategory)}
              className="px-2.5 py-1 rounded bg-[#1f5c3a] hover:bg-[#277048] text-[#fff8eb] border border-[#f5cb5c]/70 font-bold song-serif text-xs cursor-pointer transition"
            >
              前往【图鉴·博物图鉴】→
            </button>
          ) : (
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={() => openCompendium('armory')}
                className="px-2.5 py-1 rounded bg-[#1f5c3a] hover:bg-[#277048] text-[#fff8eb] border border-[#f5cb5c]/70 font-bold song-serif text-xs cursor-pointer transition"
              >
                【图鉴·披挂总纲】→
              </button>
              <button
                type="button"
                onClick={() => openCompendium('mounts')}
                className="px-2.5 py-1 rounded bg-[#1f5c3a] hover:bg-[#277048] text-[#fff8eb] border border-[#f5cb5c]/70 font-bold song-serif text-xs cursor-pointer transition"
              >
                【图鉴·坐骑图鉴】→
              </button>
            </div>
          )}
        </div>
      </div>

      {/* 下方主体：左侧随身物品卡片网格 + 右侧物品检视与使用/穿戴操作台 */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        <div className="lg:col-span-7 bg-[#efe4cc]/70 border border-[#c8b28e] rounded-md p-3.5 min-h-[380px] max-h-[480px] overflow-y-auto scroll-thin">
          {displayList.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {displayList.map(({ itemId, qty, def }) => {
                const isSel = activeStack?.itemId === itemId
                const rStyle = RARITY_STYLE_MAP[def.rarity]
                const isPoison = Boolean(def.poisonEffect && !def.useEffect)
                const manualLearned = def.useEffect?.learnArtId
                  ? learnedMap.get(def.useEffect.learnArtId)
                  : undefined
                return (
                  <button
                    key={itemId}
                    type="button"
                    onClick={() => onSelectBagItemId(itemId)}
                    className={`p-3 rounded-md border-2 text-left transition cursor-pointer flex items-start justify-between gap-2 ${
                      isSel
                        ? 'bg-[#fff9ec] border-[#8f1d14] ring-1 ring-[#8f1d14] shadow-md'
                        : `${rStyle.cardBg} ${rStyle.borderCls} hover:brightness-98`
                    }`}
                  >
                    <div className="flex items-start gap-2.5 min-w-0">
                      <div
                        className={`w-10 h-10 rounded border flex items-center justify-center shrink-0 ${rStyle.badgeBg} ${rStyle.badgeText} border-[#f5cb5c]/50`}
                      >
                        {def.equipSlot ? (
                          <SlotIcon slot={def.equipSlot} className="w-4 h-4" />
                        ) : (
                          <BagCatIcon category={def.category} className="w-4 h-4" />
                        )}
                      </div>
                      <div className="min-w-0">
                        <div className="song-serif font-bold text-xs sm:text-sm text-[#23180f] truncate">
                          {def.name}
                        </div>
                        <div className="flex items-center gap-1.5 mt-1 flex-wrap">
                          <span
                            className={`px-1.5 py-0.2 rounded text-[10px] font-bold ${rStyle.badgeBg} ${rStyle.badgeText}`}
                          >
                            {def.rarity}
                          </span>
                          <span
                            className={`text-[11px] truncate ${
                              isPoison ? 'text-[#6b21a8] font-semibold' : 'text-[#6b5235]'
                            }`}
                          >
                            {def.subType}
                          </span>
                          {manualLearned && (
                            <span className="px-1.5 py-0.2 rounded bg-[#e1f0e8] border border-[#6aa384] text-[#184f35] text-[10px] font-bold">
                              已悟·{manualLearned.level}重
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                    <span className="px-2 py-0.5 rounded border bg-[#efe4cc] border-[#c8b28e] text-[#23180f] font-mono font-bold text-xs shrink-0">
                      ×{qty}
                    </span>
                  </button>
                )
              })}
            </div>
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-center text-[#7a6042] py-16">
              <div className="song-serif font-bold text-base">
                【{currentCatMeta.label}】暂无随身藏品
              </div>
              <div className="text-xs mt-1">
                游历各州书肆、药铺、铁冶坊或秘境奇遇可收入囊中（全谱名录请点击顶部【图鉴】查阅）
              </div>
            </div>
          )}
        </div>

        {/* 右侧物品详情检视面板 */}
        <div className="lg:col-span-5 bg-[#efe4cc] border border-[#c8b28e] rounded-md p-4 flex flex-col justify-between gap-3">
          {activeStack ? (
            <>
              <div className="space-y-3">
                <div className="flex items-start justify-between gap-2 border-b border-[#cbb693] pb-2.5">
                  <div>
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span className="px-1.5 py-0.5 rounded bg-[#261910] text-amber-200 font-mono text-[10px]">
                        {activeStack.def.id}
                      </span>
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          RARITY_STYLE_MAP[activeStack.def.rarity].badgeBg
                        } ${RARITY_STYLE_MAP[activeStack.def.rarity].badgeText}`}
                      >
                        {activeStack.def.rarity}
                      </span>
                      <span className="text-xs text-[#6b5235] font-semibold">
                        {activeStack.def.subType}
                      </span>
                    </div>
                    <h4 className="song-serif font-bold text-lg text-[#23180f] mt-1">
                      {activeStack.def.name}
                    </h4>
                  </div>
                  <div className="text-right font-mono text-xs text-[#6b5235] shrink-0">
                    <div>随身 ×{activeStack.qty}</div>
                    <div className="text-[#7f1d1d] font-bold">估价 {activeStack.def.value} 两</div>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-[#3d2b19] leading-relaxed">
                  {activeStack.def.desc}
                </p>

                {activeStack.def.lore && (
                  <p className="text-xs italic text-[#6b5235] bg-[#faf3e3] border-l-2 border-[#8f1d14] px-3 py-2 rounded-r">
                    {activeStack.def.lore}
                  </p>
                )}

                {activeStack.def.equipBonus && (
                  <div className="space-y-1.5 pt-1">
                    <div className="text-xs font-bold text-[#52391e] song-serif">披挂属性加成：</div>
                    <div className="flex flex-wrap gap-1.5">
                      {formatBonusBadges(activeStack.def.equipBonus).map((b) => (
                        <span
                          key={b}
                          className="px-2 py-0.5 rounded bg-[#faf3e3] border border-[#bfa680] font-mono text-xs font-semibold text-[#7f1d1d]"
                        >
                          {b}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {activeStack.def.useEffect && (
                  <div className="p-2.5 rounded bg-[#faf3e3] border border-[#cbb693] text-xs text-[#1b5132] font-medium leading-relaxed space-y-1.5">
                    <div>
                      研读/服食/使用功效：
                      {[
                        activeStack.def.useEffect.maxHp
                          ? `气血上限 +${activeStack.def.useEffect.maxHp}`
                          : null,
                        activeStack.def.useEffect.maxMp
                          ? `内力上限 +${activeStack.def.useEffect.maxMp}`
                          : null,
                        activeStack.def.useEffect.hp
                          ? `气血 +${activeStack.def.useEffect.hp}`
                          : null,
                        activeStack.def.useEffect.mp
                          ? `内力 +${activeStack.def.useEffect.mp}`
                          : null,
                        activeStack.def.useEffect.agi
                          ? `身法 +${activeStack.def.useEffect.agi}`
                          : null,
                        activeStack.def.useEffect.res
                          ? `抗性 +${activeStack.def.useEffect.res}`
                          : null,
                        activeStack.def.useEffect.riding
                          ? `【骑术】+${activeStack.def.useEffect.riding}`
                          : null,
                        activeStack.def.useEffect.food
                          ? `粮草 +${activeStack.def.useEffect.food}日份`
                          : null,
                        activeStack.def.useEffect.skillGain
                          ? `【${activeStack.def.useEffect.skillGain[0]}】+${activeStack.def.useEffect.skillGain[1]}`
                          : null,
                        activeStack.def.useEffect.learnArtHint ?? null,
                      ]
                        .filter(Boolean)
                        .join(' · ')}
                    </div>
                    {activeStack.def.useEffect.learnArtId &&
                      MARTIAL_ART_DB_MAP[activeStack.def.useEffect.learnArtId] && (
                        <div className="pt-1 border-t border-[#dfd0b3] space-y-1">
                          <div className="flex items-center justify-between gap-2 flex-wrap">
                            <span className="text-[11px] text-[#52391e]">
                              关联武学：
                              <strong>
                                {MARTIAL_ART_DB_MAP[activeStack.def.useEffect.learnArtId].name}
                              </strong>
                              （{activeStack.def.useEffect.learnArtId} ·{' '}
                              {learnedMap.has(activeStack.def.useEffect.learnArtId)
                                ? `已习第 ${learnedMap.get(activeStack.def.useEffect.learnArtId)!.level} 重`
                                : '尚未习得'}
                              ）
                            </span>
                            <button
                              type="button"
                              onClick={() => {
                                const art =
                                  MARTIAL_ART_DB_MAP[activeStack.def.useEffect!.learnArtId!]
                                if (art) {
                                  onJumpToMartialArt(art)
                                }
                              }}
                              className="px-2 py-0.5 rounded bg-[#efe4cc] hover:bg-[#e2d1b0] border border-[#9e8462] text-[11px] text-[#781710] font-semibold cursor-pointer"
                            >
                              查阅武学总纲 →
                            </button>
                          </div>
                          <div className="text-[11px] text-[#7a6042]">
                            秘籍仅限初次展卷领悟入门（第1重），后续熟练度须凭按日闭关精修提升。
                          </div>
                        </div>
                      )}
                  </div>
                )}

                {activeStack.def.poisonEffect && (
                  <div className="p-2.5 rounded bg-[#f7eefb] border border-[#9d7bb8] text-xs text-[#4c1d6e] font-medium leading-relaxed">
                    毒理效用：{activeStack.def.poisonEffect}
                  </div>
                )}
              </div>

              <div className="pt-3 border-t border-[#cbb693] flex items-center gap-2">
                {activeStack.def.equipSlot ? (
                  <>
                    <button
                      type="button"
                      onClick={() => equipItemToSlot(activeStack.itemId)}
                      className="flex-1 px-3 py-2.5 rounded bg-[#8f1d14] hover:bg-[#a9241a] text-[#fff8eb] font-bold song-serif text-xs sm:text-sm shadow cursor-pointer transition"
                    >
                      {activeStack.def.category === 'tools'
                        ? '佩挂雅器随身'
                        : '披挂上身 / 备鞍乘骑'}
                    </button>
                    {activeStack.def.useEffect && (
                      <button
                        type="button"
                        onClick={() => consumeInventoryItem(activeStack.itemId, true)}
                        className="px-3 py-2.5 rounded bg-[#215744] hover:bg-[#2a6d56] text-[#fff8eb] font-bold song-serif text-xs sm:text-sm shadow cursor-pointer transition"
                      >
                        抚弄修习
                      </button>
                    )}
                    <button
                      type="button"
                      onClick={() => {
                        if (activeStack.def.equipSlot) {
                          onJumpToEquipSlot(activeStack.def.equipSlot)
                        }
                      }}
                      className="px-3 py-2.5 rounded bg-[#faf3e3] hover:bg-[#e7d9bc] border border-[#9e8462] text-[#3d2812] font-bold song-serif text-xs sm:text-sm cursor-pointer transition"
                    >
                      查看槽位
                    </button>
                  </>
                ) : activeStack.def.useEffect?.learnArtId &&
                  learnedMap.has(activeStack.def.useEffect.learnArtId) ? (
                  <button
                    type="button"
                    onClick={() => onJumpToPracticeArt(activeStack.def.useEffect!.learnArtId!)}
                    className="w-full px-3 py-2.5 rounded bg-[#5c4024] hover:bg-[#73512e] text-[#fff8eb] font-bold song-serif text-xs sm:text-sm shadow cursor-pointer transition"
                  >
                    已领悟入门 · 前往【披挂与武学】闭关精修 →
                  </button>
                ) : activeStack.def.useEffect ? (
                  <button
                    type="button"
                    onClick={() => consumeInventoryItem(activeStack.itemId)}
                    className="w-full px-3 py-2.5 rounded bg-[#215744] hover:bg-[#2a6d56] text-[#fff8eb] font-bold song-serif text-xs sm:text-sm shadow cursor-pointer transition"
                  >
                    {activeStack.def.category === 'scrolls'
                      ? activeStack.def.useEffect.learnArtId
                        ? '初次展卷领悟入门'
                        : '展卷研读修艺'
                      : activeStack.def.category === 'tools'
                        ? '把玩演练修习'
                        : '立即服食使用'}
                  </button>
                ) : activeStack.def.poisonEffect ? (
                  <div className="w-full py-2 text-center text-xs text-[#4c1d6e] bg-[#f7eefb] rounded border border-[#9d7bb8] font-medium">
                    奇门毒物 · 不可直接内服（供回合交锋施毒、淬炼兵刃或暗算剧情使用）
                  </div>
                ) : (
                  <div className="w-full py-2 text-center text-xs text-[#6b5235] bg-[#faf3e3] rounded border border-[#cbb693]">
                    随身常备器具/凭证（在特定雅集、奇遇或关隘自动生效）
                  </div>
                )}
              </div>
            </>
          ) : (
            <div className="h-full flex items-center justify-center text-center text-[#7a6042] py-12">
              请点击左侧物品查看详录与操作
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
