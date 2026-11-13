import { useMemo, useState } from 'react'
import { Maximize2 } from 'lucide-react'
import {
  FACTION_DB_MAP,
  ID_REGISTRY,
  MARTIAL_ART_DB_MAP,
  NPCS_DB,
  TEN_ART_KEYS,
} from '../../../data/gameDb'
import {
  ITEM_DB_MAP,
  normalizeItemTier,
  RARITY_STYLE_MAP,
  resolveUniqueArtifactLiveOwnership,
} from '../../../data/itemsDb'
import { useGameStore } from '../../../store/useGameStore'
import type { CompiledMartialArtRecord, CompiledNpcRecord } from '../../../types/game'
import { NODE_MAP, WORLD_GRAPH } from '../../../utils/mapMath'
import { ManagedAssetImg } from '../../common/ManagedAssetImg'

interface PortraitsTabProps {
  selectedNpc: CompiledNpcRecord | null
  onSelectNpc: (npc: CompiledNpcRecord | null) => void
  npcScope: string
  onChangeNpcScope: (scope: string) => void
  onJumpToSect: (sectId: string) => void
  onJumpToRegion: (regionId: string) => void
  onJumpToMartialArt: (art: CompiledMartialArtRecord) => void
  onJumpToArtifact?: (itemId: string) => void
  onOpenNpcLightbox: (npc: CompiledNpcRecord, mode: 'fullbody' | 'avatar') => void
  onCloseModal: () => void
}

export function PortraitsTab({
  selectedNpc,
  onSelectNpc,
  npcScope,
  onChangeNpcScope,
  onJumpToSect,
  onJumpToRegion,
  onJumpToMartialArt,
  onJumpToArtifact,
  onOpenNpcLightbox,
  onCloseModal,
}: PortraitsTabProps) {
  const activeRegionId = useGameStore((s) => s.activeRegionId)
  const currentNodeId = useGameStore((s) => s.currentNodeId)
  const campPos = useGameStore((s) => s.campPos)
  const traveling = useGameStore((s) => s.traveling)
  const inventory = useGameStore((s) => s.inventory)
  const equipped = useGameStore((s) => s.equipped)
  const consumedUniqueIds = useGameStore((s) => s.consumedUniqueIds)
  const navigateToNpcLeafInCurrentRegion = useGameStore(
    (s) => s.navigateToNpcLeafInCurrentRegion,
  )

  const [npcQuery, setNpcQuery] = useState('')
  const [npcRegionFilter, setNpcRegionFilter] = useState<string>('ALL')
  const [npcFactionFilter, setNpcFactionFilter] = useState<string>('ALL')

  const curNode = NODE_MAP[currentNodeId] ?? WORLD_GRAPH.nodes[0]
  const activeRegionNode = NODE_MAP[activeRegionId] ?? curNode

  const filteredNpcs = useMemo(() => {
    const q = npcQuery.trim().toLowerCase()
    return NPCS_DB.filter((c) => {
      if (npcScope === 'ALL_WITH_ART' && !c.avatarUrl && !c.fullbodyUrl) return false
      if (npcScope === 'HISTORICAL' && c.category !== '历史名人') return false
      if (npcScope === 'GRANDMASTER_MASTER' && c.realmRank > 6) return false
      if (npcScope === 'FIRST_RATE' && (c.realmRank < 7 || c.realmRank > 9)) return false
      if (npcScope === 'HERE' && c.regionId !== activeRegionId) return false

      if (npcRegionFilter !== 'ALL' && c.regionId !== npcRegionFilter) return false
      if (npcFactionFilter !== 'ALL' && c.factionId !== npcFactionFilter) return false

      if (!q) return true
      const artifactMatch = (c.ownedArtifactIds ?? []).some(
        (aid) =>
          aid.toLowerCase().includes(q) ||
          (ITEM_DB_MAP[aid]?.name.toLowerCase().includes(q) ?? false),
      )
      return (
        c.id.toLowerCase().includes(q) ||
        c.name.toLowerCase().includes(q) ||
        c.title.toLowerCase().includes(q) ||
        c.factionName.toLowerCase().includes(q) ||
        c.locationLabel.toLowerCase().includes(q) ||
        c.fullLocationLabel.toLowerCase().includes(q) ||
        c.assignedBuildingName.toLowerCase().includes(q) ||
        (c.assignedSpotName?.toLowerCase().includes(q) ?? false) ||
        c.artsText.toLowerCase().includes(q) ||
        artifactMatch
      )
    })
  }, [npcQuery, npcScope, npcRegionFilter, npcFactionFilter, activeRegionId])

  return (
    <div className="space-y-3.5 text-xs">
      <div className="flex flex-wrap items-center gap-2.5 bg-[#efe4cc] p-3 rounded border border-[#c8b28e]">
        <input
          type="text"
          value={npcQuery}
          onChange={(e) => setNpcQuery(e.target.value)}
          placeholder="搜编号/姓名/常驻殿宇/武学/执掌孤品（如：NPC-0101、乔峰、打狗棒、包拯、尚方剑）…"
          className="flex-1 min-w-[200px] px-3 py-1.5 rounded bg-[#fffaf0] border border-[#9e8462] text-[#23180f]"
        />
        <select
          value={npcScope}
          onChange={(e) => onChangeNpcScope(e.target.value)}
          className="px-2.5 py-1.5 rounded bg-[#fffaf0] border border-[#9e8462] text-[#23180f] cursor-pointer"
        >
          <option value="ALL_WITH_ART">
            已有独立原画 ({ID_REGISTRY.counts.npcsWithAvatar})
          </option>
          <option value="ALL">全部千人名录 (1000)</option>
          <option value="HERE">当前地区：{activeRegionNode?.name}</option>
          <option value="HISTORICAL">庙堂四夷历史百杰 (100)</option>
          <option value="GRANDMASTER_MASTER">大宗师与宗师 (34)</option>
          <option value="FIRST_RATE">一流高手 (120)</option>
        </select>
        <select
          value={npcRegionFilter}
          onChange={(e) => setNpcRegionFilter(e.target.value)}
          className="px-2.5 py-1.5 rounded bg-[#fffaf0] border border-[#9e8462] text-[#23180f] cursor-pointer max-w-[160px]"
        >
          <option value="ALL">全部 {ID_REGISTRY.counts.regions} 地区</option>
          {ID_REGISTRY.regions.map((r) => (
            <option key={r.id} value={r.id}>
              {r.numericCode}·{r.name} ({r.npcCount})
            </option>
          ))}
        </select>
        <select
          value={npcFactionFilter}
          onChange={(e) => setNpcFactionFilter(e.target.value)}
          className="px-2.5 py-1.5 rounded bg-[#fffaf0] border border-[#9e8462] text-[#23180f] cursor-pointer max-w-[195px]"
        >
          <option value="ALL">全部 30派+11势力</option>
          <optgroup label="一流名门大派 (SECT-01..20)">
            {ID_REGISTRY.factions
              .filter((f) => f.isMajorSect)
              .map((f) => (
                <option key={f.id} value={f.id}>
                  {f.id} {f.name} ({f.memberCount})
                </option>
              ))}
          </optgroup>
          <optgroup label="二三流门派与武馆 (SECT-21..30)">
            {ID_REGISTRY.factions
              .filter((f) => f.isMinorSect)
              .map((f) => (
                <option key={f.id} value={f.id}>
                  {f.id} {f.name} ({f.memberCount})
                </option>
              ))}
          </optgroup>
          <optgroup label="朝堂与四夷势力 (ORG-01..11)">
            {ID_REGISTRY.factions
              .filter((f) => !f.isMajorSect && !f.isMinorSect)
              .map((f) => (
                <option key={f.id} value={f.id}>
                  {f.id} {f.name} ({f.memberCount})
                </option>
              ))}
          </optgroup>
        </select>
        <span className="text-xs text-[#5e472d] font-mono">命中 {filteredNpcs.length} 人</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-start">
        {/* 左侧懒加载人物列表 */}
        <div className="lg:col-span-7 h-[640px] max-h-[66vh] overflow-y-auto scroll-thin pr-1.5 grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-2.5 content-start">
          {filteredNpcs.slice(0, 200).map((c) => {
            const isSel = selectedNpc?.id === c.id
            const leafLabel = c.assignedSpotName ?? c.assignedBuildingName
            return (
              <div
                key={c.id}
                onClick={() => onSelectNpc(c)}
                style={{ contentVisibility: 'auto', containIntrinsicSize: '0 68px' }}
                className={`p-2.5 rounded-md border text-left transition flex items-center gap-2.5 cursor-pointer ${
                  isSel
                    ? 'bg-[#8f1d14] text-[#fff8eb] border-[#f5cb5c] shadow-md'
                    : 'bg-[#efe4cc] hover:bg-[#e5d6b8] text-[#23180f] border-[#c8b28e]'
                }`}
              >
                {c.avatarUrl ? (
                  <ManagedAssetImg
                    url={c.avatarUrl}
                    alt={c.name}
                    viewportLazy
                    onClick={(e) => {
                      e.stopPropagation()
                      onSelectNpc(c)
                      onOpenNpcLightbox(c, 'avatar')
                    }}
                    title="点击放大查看人物立绘"
                    className="w-12 h-12 rounded object-cover object-top border border-[#bfa782] shrink-0 bg-[#2b1d12] hover:ring-2 hover:ring-amber-300 cursor-zoom-in"
                  />
                ) : (
                  <div
                    onClick={(e) => {
                      e.stopPropagation()
                      onSelectNpc(c)
                      onOpenNpcLightbox(c, 'fullbody')
                    }}
                    title="点击放大查看门派全身像"
                    className="w-12 h-12 rounded bg-[#4a321d] border border-[#9e7b47]/60 text-[#fff8ee] flex flex-col items-center justify-center shrink-0 hover:ring-2 hover:ring-amber-300 cursor-zoom-in"
                  >
                    <span className="song-serif font-bold text-sm leading-none">
                      {c.name.slice(0, 1)}
                    </span>
                    <span className="text-[9px] text-amber-200/90 mt-0.5">
                      {FACTION_DB_MAP[c.factionId]?.shortName ?? '群侠'}
                    </span>
                  </div>
                )}
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-1 min-w-0">
                    <span className="song-serif font-bold text-xs sm:text-sm truncate">
                      {c.name}
                    </span>
                    {(c.ownedArtifactIds?.length ?? 0) > 0 && (
                      <span
                        className={`px-1 py-0.2 rounded text-[9px] font-mono font-bold shrink-0 ${
                          isSel
                            ? 'bg-amber-300/25 text-amber-100 border border-amber-200/50'
                            : 'bg-[#4a1c17] text-[#ffe9b5]'
                        }`}
                        title={`执掌 ${c.ownedArtifactIds?.length} 件天地阶孤品重宝`}
                      >
                        宝×{c.ownedArtifactIds?.length}
                      </span>
                    )}
                  </div>
                  <div
                    title={c.fullLocationLabel}
                    className={`text-[10px] truncate mt-0.5 ${
                      isSel ? 'text-amber-200' : 'text-[#6b5235]'
                    }`}
                  >
                    {c.locationLabel} · {leafLabel}
                  </div>
                  <div
                    className={`text-[10px] truncate ${
                      isSel ? 'text-amber-100/90' : 'text-[#7c5f3d]'
                    }`}
                  >
                    {c.realm}
                  </div>
                </div>
              </div>
            )
          })}
          {filteredNpcs.length > 200 && (
            <div className="col-span-full text-center py-2.5 text-xs text-[#6b5235]">
              当前显示前 200 条档案，可通过上方搜索框或地区/门派筛选器精确检索其余人物。
            </div>
          )}
        </div>

        {/* 右侧选中人物详情与统一 3:4 画幅全身像（杜绝 flex 压缩导致大小不一） */}
        <div className="lg:col-span-5 p-4 rounded-md bg-[#efe4cc] border border-[#c8b28e] flex flex-col gap-3 h-[640px] max-h-[66vh] overflow-y-auto scroll-thin">
          {selectedNpc ? (
            <>
              <div className="shrink-0 flex items-start justify-between gap-2 border-b border-[#cbb693] pb-2.5">
                <div className="flex items-start gap-2.5 min-w-0">
                  {selectedNpc.avatarUrl && (
                    <ManagedAssetImg
                      url={selectedNpc.avatarUrl}
                      alt={`${selectedNpc.name} 头像`}
                      onClick={() => onOpenNpcLightbox(selectedNpc, 'avatar')}
                      title="点击放大查看高清头像"
                      className="w-12 h-12 rounded border border-[#8c6e46] object-cover shrink-0 bg-[#2b1d12] cursor-zoom-in hover:ring-2 hover:ring-[#8f1d14]"
                    />
                  )}
                  <div className="min-w-0">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span className="font-mono text-[10px] px-1.5 py-0.5 rounded bg-[#261910] text-amber-200">
                        {selectedNpc.id}
                      </span>
                      <span className="song-serif font-bold text-lg text-[#23180f]">
                        {selectedNpc.name}
                      </span>
                      <span className="text-xs text-[#6b5235]">· {selectedNpc.title}</span>
                    </div>
                    <div className="text-xs text-[#781710] font-medium mt-0.5 flex items-center gap-1.5 flex-wrap">
                      <button
                        type="button"
                        onClick={() => onJumpToSect(selectedNpc.factionId)}
                        title="跳转至【贰 · 门派图鉴】查阅该门派/势力详录"
                        className="px-1.5 py-0.5 rounded bg-[#8f1d14]/10 hover:bg-[#8f1d14]/20 border border-[#8f1d14]/40 text-[#781710] font-semibold cursor-pointer transition"
                      >
                        [{selectedNpc.factionId}] {selectedNpc.factionName} ▸
                      </button>
                      <span>
                        · {selectedNpc.role}（{selectedNpc.gender}·{selectedNpc.age}岁）
                      </span>
                    </div>
                    <div className="text-xs text-[#4a3219] mt-1 space-y-1">
                      <div>
                        常驻最末层：<strong>{selectedNpc.fullLocationLabel}</strong>（`
                        {selectedNpc.regionId}`）
                      </div>
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <button
                          type="button"
                          onClick={() => onJumpToRegion(selectedNpc.regionId)}
                          className="px-2 py-0.5 rounded bg-[#5c4024] hover:bg-[#73512e] text-[#fff8eb] text-[10px] font-semibold cursor-pointer"
                        >
                          地区图鉴 ▸
                        </button>
                        {currentNodeId === selectedNpc.regionId && !campPos && !traveling && (
                          <button
                            type="button"
                            onClick={() => navigateToNpcLeafInCurrentRegion(selectedNpc.id)}
                            className="px-2 py-0.5 rounded bg-[#1f5c3a] hover:bg-[#277048] text-[#fff8eb] text-[10px] font-semibold cursor-pointer"
                          >
                            直赴本城常驻殿宇 →
                          </button>
                        )}
                        <button
                          type="button"
                          onClick={() => {
                            useGameStore.setState({
                              viewMode: 'world',
                              selectedNodeId: selectedNpc.regionId,
                            })
                            onCloseModal()
                          }}
                          className="px-2 py-0.5 rounded bg-[#8f1d14] hover:bg-[#a9241a] text-[#fff8eb] text-[10px] cursor-pointer"
                        >
                          舆图寻路定位 →
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <span className="px-2 py-0.5 rounded bg-[#5c4024] text-[#fff8ee] text-xs shrink-0">
                  {selectedNpc.realm}
                </span>
              </div>

              {/* 固定 3:4 标准画幅全身立绘框 */}
              <div className="shrink-0 bg-[#18100a] border-2 border-[#8c6e46] rounded-md p-2 flex flex-col items-center">
                <div
                  role="button"
                  tabIndex={0}
                  onClick={() => onOpenNpcLightbox(selectedNpc, 'fullbody')}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      onOpenNpcLightbox(selectedNpc, 'fullbody')
                    }
                  }}
                  title="点击放大品鉴高清全身绘像"
                  className="w-[240px] h-[320px] rounded overflow-hidden relative group cursor-zoom-in bg-[#24180f] shadow-lg border border-[#c89d54]/40"
                >
                  <ManagedAssetImg
                    key={selectedNpc.id}
                    url={selectedNpc.fullbodyUrl ?? selectedNpc.templateUrl}
                    alt={`${selectedNpc.name} 全身立绘`}
                    className="w-full h-full object-cover object-top group-hover:scale-[1.03] transition-transform duration-300"
                  />
                  <span className="absolute top-2 right-2 px-2 py-1 rounded bg-black/75 text-[#fff8eb] text-[11px] flex items-center gap-1 border border-[#c89d54]/50 shadow">
                    <Maximize2 className="w-3 h-3 text-amber-300" />
                    <span>点击放大</span>
                  </span>
                  {!selectedNpc.fullbodyUrl && (
                    <span className="absolute bottom-1.5 inset-x-1.5 text-center px-1.5 py-0.5 rounded bg-black/75 text-[10px] text-[#f5dfb5] border border-[#c89d54]/40">
                      门派母版全身立绘
                    </span>
                  )}
                </div>
              </div>

              {/* 1) 实战四维属性 */}
              <div className="shrink-0 bg-[#faf3e3] border border-[#cbb693] rounded p-2.5 space-y-1.5">
                <div className="flex items-center justify-between text-[11px]">
                  <span className="font-bold song-serif text-[#5e472d]">实战四维属性</span>
                  <span className="text-[10px] text-[#7a5f3e]">回合交锋结算维度</span>
                </div>
                <div className="grid grid-cols-4 gap-1.5 text-center font-mono text-xs">
                  <div className="bg-[#efe4cc] rounded py-1 border border-[#dcc9a7]">
                    <div className="text-[10px] text-[#6b5235] font-sans">气血</div>
                    <strong className="text-[#8f1d14]">{selectedNpc.stats.hp}</strong>
                  </div>
                  <div className="bg-[#efe4cc] rounded py-1 border border-[#dcc9a7]">
                    <div className="text-[10px] text-[#6b5235] font-sans">内力</div>
                    <strong className="text-[#1d473a]">{selectedNpc.stats.mp}</strong>
                  </div>
                  <div className="bg-[#efe4cc] rounded py-1 border border-[#dcc9a7]">
                    <div className="text-[10px] text-[#6b5235] font-sans">身法</div>
                    <strong>{selectedNpc.stats.agi}</strong>
                  </div>
                  <div className="bg-[#efe4cc] rounded py-1 border border-[#dcc9a7]">
                    <div className="text-[10px] text-[#6b5235] font-sans">抗性</div>
                    <strong>{selectedNpc.stats.res}</strong>
                  </div>
                </div>
              </div>

              {/* 2) 先天三维禀赋（根骨 / 悟性 / 颜值） */}
              <div className="shrink-0 bg-[#faf3e3] border border-[#cbb693] rounded p-2.5 space-y-1.5">
                <div className="flex items-center justify-between text-[11px]">
                  <span className="font-bold song-serif text-[#5e472d]">先天三维禀赋</span>
                  <span className="text-[10px] text-[#7a5f3e]">
                    修炼瓶颈 · 奇遇 · 社交（不入战中伤害）
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-1.5 text-center font-mono text-xs">
                  <div className="bg-[#efe4cc] rounded py-1 px-1.5 border border-[#dcc9a7]">
                    <div className="text-[10px] text-[#6b5235] font-sans">根骨</div>
                    <strong className="text-[#781710]">{selectedNpc.talents.bone}</strong>
                    <span className="text-[10px] text-[#7a5f3e]">/100</span>
                  </div>
                  <div className="bg-[#efe4cc] rounded py-1 px-1.5 border border-[#dcc9a7]">
                    <div className="text-[10px] text-[#6b5235] font-sans">悟性</div>
                    <strong className="text-[#184f35]">{selectedNpc.talents.comprehension}</strong>
                    <span className="text-[10px] text-[#7a5f3e]">/100</span>
                  </div>
                  <div className="bg-[#efe4cc] rounded py-1 px-1.5 border border-[#dcc9a7]">
                    <div className="text-[10px] text-[#6b5235] font-sans">颜值</div>
                    <strong className="text-[#6d3b1a]">{selectedNpc.talents.charm}</strong>
                    <span className="text-[10px] text-[#7a5f3e]">/100</span>
                  </div>
                </div>
              </div>

              {/* 3) 北宋十艺百工（0~100） */}
              <div className="shrink-0 bg-[#faf3e3] border border-[#cbb693] rounded p-2.5 space-y-1.5">
                <div className="flex items-center justify-between text-[11px]">
                  <span className="font-bold song-serif text-[#5e472d]">十艺百工造诣</span>
                  <span className="text-[10px] text-[#7a5f3e]">0~100 雅艺与实务专精</span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-1.5">
                  {TEN_ART_KEYS.map((artKey) => {
                    const score = selectedNpc.tenArts[artKey] ?? 0
                    const isMastery = score >= 80
                    return (
                      <div
                        key={artKey}
                        className={`p-1.5 rounded border text-center ${
                          isMastery
                            ? 'bg-[#f4e2c2] border-[#c48a35]'
                            : 'bg-[#efe4cc] border-[#dcc9a7]'
                        }`}
                      >
                        <div className="flex items-center justify-between text-[10px]">
                          <span className="text-[#5e472d] font-medium">{artKey}</span>
                          <strong
                            className={`font-mono ${
                              isMastery ? 'text-[#8f1d14]' : 'text-[#23180f]'
                            }`}
                          >
                            {score}
                          </strong>
                        </div>
                        <div className="mt-1 h-1 w-full rounded-full bg-[#d8c6a5] overflow-hidden">
                          <div
                            style={{ width: `${Math.min(100, Math.max(0, score))}%` }}
                            className={`h-full ${isMastery ? 'bg-[#8f1d14]' : 'bg-[#6b5235]'}`}
                          />
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>

              {selectedNpc.knownArtIds.length > 0 && (
                <div className="shrink-0 space-y-1">
                  <div className="text-[11px] font-bold text-[#5e472d]">
                    关联标准武学 ID ({selectedNpc.knownArtIds.length})：
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedNpc.knownArtIds.map((aid) => {
                      const art = MARTIAL_ART_DB_MAP[aid]
                      return (
                        <button
                          key={aid}
                          type="button"
                          onClick={() => {
                            if (art) {
                              onJumpToMartialArt(art)
                            }
                          }}
                          className="px-2 py-0.5 rounded bg-[#faf3e3] hover:bg-[#e5d6b8] border border-[#9e8462] text-[11px] text-[#781710] font-medium cursor-pointer"
                        >
                          {aid} · {art?.cleanName ?? aid}
                        </button>
                      )
                    })}
                  </div>
                </div>
              )}

              {(selectedNpc.ownedArtifactIds?.length ?? 0) > 0 && (
                <div className="shrink-0 bg-[#fdf5e4] border-2 border-[#c8963e] rounded p-2.5 space-y-1.5">
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="font-bold song-serif text-[#781710]">
                      执掌天地阶孤品重宝 ({selectedNpc.ownedArtifactIds?.length} 件)
                    </span>
                    <span className="text-[10px] text-[#7a5f3e]">举世唯一 · 点击查阅图鉴</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {(selectedNpc.ownedArtifactIds ?? []).map((aid) => {
                      const def = ITEM_DB_MAP[aid]
                      const tier = def ? normalizeItemTier(def.rarity) : '地阶'
                      const rStyle = RARITY_STYLE_MAP[tier]
                      const liveInfo = resolveUniqueArtifactLiveOwnership(
                        aid,
                        inventory,
                        equipped,
                        consumedUniqueIds,
                      )
                      const transferredNote =
                        liveInfo?.liveStatus === 'player_equipped' ||
                        liveInfo?.liveStatus === 'player_bag'
                          ? '（已归少侠）'
                          : liveInfo?.liveStatus === 'consumed'
                            ? '（已炼化）'
                            : ''
                      return (
                        <button
                          key={aid}
                          type="button"
                          onClick={() => onJumpToArtifact?.(aid)}
                          title={liveInfo?.ownerSubtitle ?? aid}
                          className="px-2 py-1 rounded bg-[#fffaf0] hover:bg-[#f2e4c9] border border-[#b58c44] text-[11px] text-[#23180f] font-medium cursor-pointer flex items-center gap-1 transition"
                        >
                          <span
                            className={`px-1 py-0.2 rounded text-[9px] font-bold ${rStyle.badgeBg} ${rStyle.badgeText}`}
                          >
                            {tier}
                          </span>
                          <span className="song-serif font-bold text-[#781710]">
                            {def?.name ?? aid}
                          </span>
                          {transferredNote && (
                            <span className="text-[10px] text-[#185a3d] font-semibold">
                              {transferredNote}
                            </span>
                          )}
                          <span className="text-[10px] text-[#7a5f3e]">▸</span>
                        </button>
                      )
                    })}
                  </div>
                </div>
              )}

              {selectedNpc.specialtyTags.length > 0 && (
                <div className="shrink-0 text-xs text-[#4a3219]">
                  <strong>雅好/头衔标签：</strong>
                  {selectedNpc.specialtyTags.join('、')}
                </div>
              )}

              <p className="text-xs text-[#3d2b19] leading-relaxed pb-1">{selectedNpc.bio}</p>
            </>
          ) : null}
        </div>
      </div>
    </div>
  )
}
