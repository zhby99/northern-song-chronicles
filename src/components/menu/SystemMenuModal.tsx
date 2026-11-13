import { useMemo, useState } from 'react'
import { useGameStore } from '../../store/useGameStore'
import type { MenuTabKey, MountKey, PortraitCharacter } from '../../types/game'
import {
  ASSET_MANIFEST,
  formatByteSize,
  recordAssetLoaded,
  useAssetTelemetry,
} from '../../utils/assetLoader'
import {
  formatSongDate,
  getEffectiveSpeed,
  NODE_MAP,
  PORTRAIT_CATALOG,
  WORLD_GRAPH,
} from '../../utils/mapMath'

const MENU_NAV_ITEMS: Array<{
  key: MenuTabKey
  numeral: string
  label: string
  seal: string
  subtitle: string
}> = [
  {
    key: 'hero',
    numeral: '壹',
    label: '主角面板',
    seal: '侠',
    subtitle: '角色根骨悟性颜值、实战四维、通用十艺与坐骑轻功配置',
  },
  {
    key: 'bag',
    numeral: '贰',
    label: '背 包',
    seal: '囊',
    subtitle: '随身盘缠纹银、行军干粮补给与后续兵刃秘籍格位容器',
  },
  {
    key: 'portraits',
    numeral: '叁',
    label: '群侠图鉴',
    seal: '谱',
    subtitle: '已合并群侠分支 240 位核心人物档案与 12 套门派母版立绘（按需懒加载）',
  },
  {
    key: 'engineering',
    numeral: '肆',
    label: '工程监控',
    seal: '枢',
    subtitle: 'M0-1 工程化拆解与静态资源按需懒加载（Lazy-Load）实时遥测面板',
  },
  {
    key: 'save',
    numeral: '伍',
    label: '存 档',
    seal: '录',
    subtitle: '将当前皇祐纪年历法、所在地域与江湖经历封入卷宗（待 M0-4 接入）',
  },
  {
    key: 'load',
    numeral: '陆',
    label: '读 档',
    seal: '启',
    subtitle: '调阅往昔手札卷宗，回溯关键江湖分歧（待 M0-4 接入）',
  },
  {
    key: 'settings',
    numeral: '柒',
    label: '设 置',
    seal: '律',
    subtitle: '舆图显示偏好、牌匾标注开关与界面主题调校',
  },
]

const QINGGONG_OPTIONS = [
  { label: '基础身法 (+0%)', value: 0 },
  { label: '越女轻身术 (+15%)', value: 0.15 },
  { label: '梯云纵 / 踏雪无痕 (+30%)', value: 0.3 },
  { label: '凌波微步 (+50%)', value: 0.5 },
]

export function SystemMenuModal() {
  const menuOpen = useGameStore((s) => s.menuOpen)
  const activeMenuTab = useGameStore((s) => s.activeMenuTab)
  const dayCount = useGameStore((s) => s.dayCount)
  const viewMode = useGameStore((s) => s.viewMode)
  const currentNodeId = useGameStore((s) => s.currentNodeId)
  const hp = useGameStore((s) => s.hp)
  const mp = useGameStore((s) => s.mp)
  const agility = useGameStore((s) => s.agility)
  const res = useGameStore((s) => s.res)
  const ridingSkill = useGameStore((s) => s.ridingSkill)
  const silver = useGameStore((s) => s.silver)
  const food = useGameStore((s) => s.food)
  const skills = useGameStore((s) => s.skills)
  const mountKey = useGameStore((s) => s.mountKey)
  const qinggongBonus = useGameStore((s) => s.qinggongBonus)
  const showRegionLabels = useGameStore((s) => s.showRegionLabels)

  const closeMenu = useGameStore((s) => s.closeMenu)
  const setMenuTab = useGameStore((s) => s.setMenuTab)
  const setMountKey = useGameStore((s) => s.setMountKey)
  const setQinggongBonus = useGameStore((s) => s.setQinggongBonus)
  const replenishSupplies = useGameStore((s) => s.replenishSupplies)
  const toggleRegionLabels = useGameStore((s) => s.toggleRegionLabels)
  const setAllLabelToggles = useGameStore((s) => s.setAllLabelToggles)

  const telemetry = useAssetTelemetry()

  // Portrait Gallery filter state
  const [portraitQuery, setPortraitQuery] = useState('')
  const [portraitCategory, setPortraitCategory] = useState<string>('ALL_WITH_ART')
  const [selectedChar, setSelectedChar] = useState<PortraitCharacter | null>(
    () => PORTRAIT_CATALOG.characters[0] ?? null,
  )

  const categories = useMemo(() => {
    const set = new Set<string>()
    for (const c of PORTRAIT_CATALOG.characters) {
      set.add(c.cat)
    }
    return Array.from(set)
  }, [])

  const filteredCharacters = useMemo(() => {
    const q = portraitQuery.trim().toLowerCase()
    return PORTRAIT_CATALOG.characters.filter((c) => {
      if (portraitCategory === 'ALL_WITH_ART' && !c.avatarUrl && !c.fullbodyUrl) {
        return false
      }
      if (
        portraitCategory !== 'ALL' &&
        portraitCategory !== 'ALL_WITH_ART' &&
        c.cat !== portraitCategory
      ) {
        return false
      }
      if (!q) return true
      return (
        c.name.toLowerCase().includes(q) ||
        c.title.toLowerCase().includes(q) ||
        c.faction.toLowerCase().includes(q) ||
        c.loc.toLowerCase().includes(q)
      )
    })
  }, [portraitQuery, portraitCategory])

  if (!menuOpen) return null

  const curNode = NODE_MAP[currentNodeId] ?? WORLD_GRAPH.nodes[0]
  const activeMeta =
    MENU_NAV_ITEMS.find((m) => m.key === activeMenuTab) ?? MENU_NAV_ITEMS[0]
  const speedInfo = getEffectiveSpeed(
    { mountKey, qinggongBonus, ridingSkill, agility },
    'official',
  )

  return (
    <div
      id="game-menu-overlay"
      onClick={(e) => {
        if (e.target === e.currentTarget) closeMenu()
      }}
      className="fixed inset-0 z-50 bg-black/65 flex items-center justify-center p-4 select-none"
    >
      <div className="w-full max-w-5xl h-[620px] max-h-[90vh] bg-[#f8f1e1] text-[#23180f] border-2 border-[#6e5233] rounded-lg shadow-2xl flex flex-col overflow-hidden">
        {/* 顶部栏：金石朱印标题 + 快捷关闭 */}
        <div className="shrink-0 bg-[#261910] text-[#fbf2e0] border-b-2 border-[#c89d54] px-5 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="w-7 h-7 rounded bg-[#8f1d14] border border-[#f5cb5c]/70 flex items-center justify-center song-serif font-bold text-sm text-[#fff7e6]">
              枢
            </span>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="song-serif font-bold text-base tracking-widest text-amber-200">
                  《北宋立志传》行囊枢机总览
                </h2>
                <span className="px-2 py-0.5 rounded bg-[#47321d] border border-[#9e7b47]/60 text-[11px] text-[#f5dfb5]">
                  {activeMeta.label.replace(/\s+/g, '')}
                </span>
              </div>
              <p className="text-[11px] text-[#d6c5a5]">
                模块化前端工程 (M0-1) · 按 ESC 键或点击右上角返回舆图
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={closeMenu}
            className="px-3 py-1.5 rounded bg-[#3d291a] hover:bg-[#8f1d14] text-[#fbf2e0] border border-[#c89d54]/60 text-xs font-bold song-serif transition cursor-pointer"
          >
            ✕ 返回江湖
          </button>
        </div>

        {/* 主体：左侧导航栏 + 右侧独立模块容器 */}
        <div className="flex-1 flex min-h-0">
          <nav className="w-52 shrink-0 bg-[#efe4cc] border-r border-[#bfa782] p-3 flex flex-col justify-between overflow-y-auto scroll-thin">
            <div className="space-y-1.5">
              {MENU_NAV_ITEMS.map((item) => {
                const isAct = item.key === activeMenuTab
                return (
                  <button
                    key={item.key}
                    type="button"
                    onClick={() => setMenuTab(item.key)}
                    className={
                      isAct
                        ? 'w-full px-3 py-2.5 rounded-md border-2 border-[#f5cb5c] bg-[#8f1d14] text-[#fff8eb] text-left song-serif font-bold text-sm shadow-md transition flex items-center justify-between cursor-pointer'
                        : 'w-full px-3 py-2.5 rounded-md border border-[#b59c77] bg-[#f8f1e1] hover:bg-[#e7d9bc] text-[#2b1a0e] text-left song-serif font-bold text-sm transition flex items-center justify-between cursor-pointer'
                    }
                  >
                    <span className="flex items-center gap-2">
                      <span className="w-5 text-center text-xs font-mono">{item.numeral}</span>
                      <span>{item.label}</span>
                    </span>
                    <span className="text-xs opacity-75">▸</span>
                  </button>
                )
              })}
            </div>

            <div className="pt-3 mt-3 border-t border-[#c7b18e] text-[11px] text-[#5e472d] space-y-1">
              <div className="flex justify-between">
                <span>当前纪年</span>
                <span className="font-semibold">{formatSongDate(dayCount).split(' · ')[0]}</span>
              </div>
              <div className="flex justify-between">
                <span>所在地域</span>
                <span className="font-semibold">{curNode?.name}</span>
              </div>
              <div className="flex justify-between">
                <span>已懒加载</span>
                <span className="font-mono font-bold text-[#1b5132]">
                  {telemetry.loadedCount}/{ASSET_MANIFEST.summary.totalExtractedImageFiles}
                </span>
              </div>
            </div>
          </nav>

          {/* 右侧子面板动态内容舞台 */}
          <section className="flex-1 overflow-y-auto scroll-thin p-5 bg-[#faf4e6] flex flex-col justify-between gap-4">
            <div className="space-y-4">
              {/* 模块头 */}
              <div className="flex items-start justify-between border-b-2 border-[#cbb693] pb-3">
                <div className="flex items-center gap-3.5">
                  <div className="w-11 h-11 rounded-md bg-[#8f1d14] border-2 border-[#f2c97d] text-[#fff8eb] flex items-center justify-center song-serif font-bold text-xl shadow">
                    {activeMeta.seal}
                  </div>
                  <div>
                    <h3 className="song-serif font-bold text-lg text-[#23180f] tracking-wide">
                      {activeMeta.label}
                    </h3>
                    <p className="text-xs text-[#6b5235] mt-0.5">{activeMeta.subtitle}</p>
                  </div>
                </div>
                <span
                  className={`px-2.5 py-1 rounded border text-[11px] font-semibold ${
                    activeMenuTab === 'engineering' || activeMenuTab === 'portraits'
                      ? 'bg-[#e1f0e8] border-[#6aa384] text-[#184f35]'
                      : 'bg-[#e8dac0] border-[#b89f78] text-[#52391e]'
                  }`}
                >
                  {activeMenuTab === 'engineering' || activeMenuTab === 'portraits'
                    ? 'M0-1 已实装'
                    : '玩法待深化设计'}
                </span>
              </div>

              {/* 1. 主角面板 */}
              {activeMenuTab === 'hero' && (
                <div className="space-y-4 text-xs">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <div className="p-3 rounded bg-[#efe4cc] border border-[#c8b28e]">
                      <div className="text-[#6b5033] mb-1">基础三维（非战斗）</div>
                      <div className="font-mono font-bold text-sm text-[#23180f]">
                        根骨 72 · 悟性 84 · 颜值 78
                      </div>
                    </div>
                    <div className="p-3 rounded bg-[#efe4cc] border border-[#c8b28e]">
                      <div className="text-[#6b5033] mb-1">战斗四维</div>
                      <div className="font-mono font-bold text-sm text-[#7f1d1d]">
                        气血 {hp} · 内力 {mp} · 身法 {agility} · 抗性 {res}
                      </div>
                    </div>
                    <div className="p-3 rounded bg-[#efe4cc] border border-[#c8b28e]">
                      <div className="text-[#6b5033] mb-1">官道日行速率</div>
                      <div className="font-mono font-bold text-sm text-[#1b5132]">
                        {speedInfo.baseDailyLi} 里/日（加成 +{speedInfo.modifierPct}%）
                      </div>
                    </div>
                  </div>

                  {/* 通用十艺一览 */}
                  <div className="p-3.5 rounded bg-[#efe4cc] border border-[#c8b28e] space-y-2">
                    <div className="song-serif font-bold text-[#52391e]">
                      通用十艺修为（可在各州书院、樊楼、寺观演武场历练提升）
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                      <div className="px-2.5 py-1.5 rounded bg-[#faf3e3] border border-[#cbb693] flex justify-between">
                        <span>骑术</span>
                        <strong className="font-mono text-[#8f1d14]">{ridingSkill}</strong>
                      </div>
                      {Object.entries(skills).map(([k, v]) => (
                        <div
                          key={k}
                          className="px-2.5 py-1.5 rounded bg-[#faf3e3] border border-[#cbb693] flex justify-between"
                        >
                          <span>{k}</span>
                          <strong className="font-mono text-[#23180f]">{v}</strong>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* 坐骑与轻功切换（直接影响大地图 Dijkstra 寻路耗时） */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 p-3.5 rounded bg-[#efe4cc] border border-[#c8b28e]">
                    <label className="space-y-1 block">
                      <span className="font-bold song-serif text-[#52391e]">
                        当前乘骑良驹（影响大地图行军）
                      </span>
                      <select
                        value={mountKey}
                        onChange={(e) => setMountKey(e.target.value as MountKey)}
                        className="w-full px-2.5 py-1.5 rounded bg-[#fffaf0] border border-[#8c6e46] text-[#23180f] cursor-pointer"
                      >
                        {(Object.keys(WORLD_GRAPH.mounts) as MountKey[]).map((k) => (
                          <option key={k} value={k}>
                            {WORLD_GRAPH.mounts[k].name}（基础 {WORLD_GRAPH.mounts[k].speed} 里/日）
                          </option>
                        ))}
                      </select>
                    </label>

                    <label className="space-y-1 block">
                      <span className="font-bold song-serif text-[#52391e]">
                        随身轻功身法加成
                      </span>
                      <select
                        value={qinggongBonus}
                        onChange={(e) => setQinggongBonus(Number(e.target.value))}
                        className="w-full px-2.5 py-1.5 rounded bg-[#fffaf0] border border-[#8c6e46] text-[#23180f] cursor-pointer"
                      >
                        {QINGGONG_OPTIONS.map((opt) => (
                          <option key={opt.value} value={opt.value}>
                            {opt.label}
                          </option>
                        ))}
                      </select>
                    </label>
                  </div>

                  <div className="p-4 rounded-md border border-dashed border-[#bba37c] bg-[#f3ead6] text-center text-[#695036]">
                    注：创角出身、武学招式搭配、经脉周天等深度养成玩法待后续阶段专项设计后接入。
                  </div>
                </div>
              )}

              {/* 2. 背包面板 */}
              {activeMenuTab === 'bag' && (
                <div className="space-y-4 text-xs">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="p-3.5 rounded bg-[#efe4cc] border border-[#c8b28e] flex items-center justify-between">
                      <div>
                        <div className="text-[#6b5033] font-medium">随身纹银</div>
                        <div className="text-[11px] text-[#7a6042] mt-0.5">
                          可于各州衙门揭榜领赏获取
                        </div>
                      </div>
                      <span className="font-mono font-bold text-lg text-[#7f1d1d]">
                        {silver} 两
                      </span>
                    </div>

                    <div className="p-3.5 rounded bg-[#efe4cc] border border-[#c8b28e] flex items-center justify-between">
                      <div>
                        <div className="text-[#6b5033] font-medium">行军干粮</div>
                        <div className="text-[11px] text-[#7a6042] mt-0.5">
                          大地图远征每行一日消耗 1 份
                        </div>
                      </div>
                      <div className="flex items-center gap-2.5">
                        <span className="font-mono font-bold text-lg text-[#1e4620]">
                          {food} 日份
                        </span>
                        <button
                          type="button"
                          onClick={replenishSupplies}
                          className="px-2.5 py-1.5 rounded bg-[#1f5c3a] hover:bg-[#277048] text-[#fff8eb] font-bold song-serif cursor-pointer transition"
                        >
                          购粮 (+20份 / 5两)
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="p-6 rounded-md border-2 border-dashed border-[#bba37c] bg-[#f3ead6] text-center space-y-2">
                    <div className="song-serif font-bold text-base text-[#52391e]">
                      【背包道具与装备栏】模块容器已就绪
                    </div>
                    <p className="text-xs text-[#695036] max-w-lg mx-auto leading-relaxed">
                      当前仅保留大地图行军所需的纹银与干粮补给。兵刃甲胄、丹药毒物、武学秘籍残卷等格位将在玩法细化后接入。
                    </p>
                  </div>
                </div>
              )}

              {/* 3. 群侠图鉴（合并自人物分支，全部静态立绘按需懒加载） */}
              {activeMenuTab === 'portraits' && (
                <div className="space-y-3 text-xs">
                  <div className="flex flex-wrap items-center gap-2 bg-[#efe4cc] p-2.5 rounded border border-[#c8b28e]">
                    <input
                      type="text"
                      value={portraitQuery}
                      onChange={(e) => setPortraitQuery(e.target.value)}
                      placeholder="搜索姓名、字号、势力或驻地（如：包拯、展昭、乔峰、大理）…"
                      className="flex-1 min-w-[200px] px-2.5 py-1.5 rounded bg-[#fffaf0] border border-[#9e8462] text-[#23180f]"
                    />
                    <select
                      value={portraitCategory}
                      onChange={(e) => setPortraitCategory(e.target.value)}
                      className="px-2.5 py-1.5 rounded bg-[#fffaf0] border border-[#9e8462] text-[#23180f] cursor-pointer"
                    >
                      <option value="ALL_WITH_ART">已有独立原画人物 (51)</option>
                      <option value="ALL">全部名录档案 ({PORTRAIT_CATALOG.characters.length})</option>
                      {categories.map((cat) => (
                        <option key={cat} value={cat}>
                          分类：{cat}
                        </option>
                      ))}
                    </select>
                    <span className="text-[11px] text-[#5e472d] font-mono">
                      共 {filteredCharacters.length} 人
                    </span>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-3">
                    {/* 左侧懒加载头像网格 */}
                    <div className="lg:col-span-7 max-h-[340px] overflow-y-auto scroll-thin pr-1 grid grid-cols-2 sm:grid-cols-3 gap-2">
                      {filteredCharacters.map((c) => {
                        const isSel = selectedChar?.id === c.id
                        return (
                          <button
                            key={c.id}
                            type="button"
                            onClick={() => setSelectedChar(c)}
                            className={`p-2 rounded border text-left transition flex items-center gap-2 cursor-pointer ${
                              isSel
                                ? 'bg-[#8f1d14] text-[#fff8eb] border-[#f5cb5c] shadow'
                                : 'bg-[#efe4cc] hover:bg-[#e5d6b8] text-[#23180f] border-[#c8b28e]'
                            }`}
                          >
                            {c.avatarUrl ? (
                              <img
                                src={c.avatarUrl}
                                alt={c.name}
                                loading="lazy"
                                onLoad={() => {
                                  if (c.avatarUrl) recordAssetLoaded(c.avatarUrl, 58000)
                                }}
                                className="w-10 h-10 rounded object-cover border border-[#bfa782] shrink-0 bg-[#2b1d12]"
                              />
                            ) : (
                              <div className="w-10 h-10 rounded bg-[#5c4024] text-[#fff8ee] flex items-center justify-center song-serif font-bold text-sm shrink-0">
                                {c.name.slice(0, 1)}
                              </div>
                            )}
                            <div className="min-w-0">
                              <div className="song-serif font-bold truncate">{c.name}</div>
                              <div
                                className={`text-[10px] truncate ${
                                  isSel ? 'text-amber-200' : 'text-[#6b5235]'
                                }`}
                              >
                                {c.faction}
                              </div>
                            </div>
                          </button>
                        )
                      })}
                    </div>

                    {/* 右侧选中人物立绘与生平详情 */}
                    <div className="lg:col-span-5 p-3 rounded bg-[#efe4cc] border border-[#c8b28e] flex flex-col gap-2.5 max-h-[340px] overflow-y-auto scroll-thin">
                      {selectedChar ? (
                        <>
                          <div className="flex items-start justify-between gap-2 border-b border-[#cbb693] pb-2">
                            <div>
                              <div className="song-serif font-bold text-base text-[#23180f]">
                                {selectedChar.name}{' '}
                                <span className="text-xs font-normal text-[#6b5235]">
                                  · {selectedChar.title}
                                </span>
                              </div>
                              <div className="text-[11px] text-[#781710] font-medium mt-0.5">
                                {selectedChar.faction} · {selectedChar.role}（{selectedChar.loc}）
                              </div>
                            </div>
                            <span className="px-2 py-0.5 rounded bg-[#5c4024] text-[#fff8ee] text-[10px] shrink-0">
                              {selectedChar.realm}
                            </span>
                          </div>

                          {selectedChar.fullbodyUrl && (
                            <div className="w-full h-44 rounded bg-[#1e150e] border border-[#8c6e46] overflow-hidden flex items-center justify-center">
                              <img
                                src={selectedChar.fullbodyUrl}
                                alt={`${selectedChar.name} 全身立绘`}
                                loading="lazy"
                                onLoad={() => {
                                  if (selectedChar.fullbodyUrl) {
                                    recordAssetLoaded(selectedChar.fullbodyUrl, 135000)
                                  }
                                }}
                                className="max-h-full max-w-full object-contain"
                              />
                            </div>
                          )}

                          <div className="text-[11px] text-[#4a3219]">
                            <strong>所修武学/技艺：</strong>
                            {selectedChar.arts}
                          </div>
                          <p className="text-[11px] text-[#3d2b19] leading-relaxed">
                            {selectedChar.bio}
                          </p>
                        </>
                      ) : (
                        <div className="text-center text-[#6b5235] py-12">
                          请点击左侧人物查阅立绘与列传
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* 4. M0-1 工程监控 */}
              {activeMenuTab === 'engineering' && (
                <div className="space-y-4 text-xs">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    <div className="p-3 rounded bg-[#efe4cc] border border-[#c8b28e]">
                      <div className="text-[#6b5033]">旧版单文件体积</div>
                      <div className="font-mono font-bold text-base text-[#8f1d14] mt-0.5">
                        {formatByteSize(
                          ASSET_MANIFEST.legacySizes.northern_song_map_html_bytes +
                            ASSET_MANIFEST.legacySizes.character_portrait_gallery_html_bytes,
                        )}
                      </div>
                      <div className="text-[10px] text-[#6b5235]">Base64 硬编码阻塞解析</div>
                    </div>

                    <div className="p-3 rounded bg-[#efe4cc] border border-[#c8b28e]">
                      <div className="text-[#6b5033]">抽离静态图片总数</div>
                      <div className="font-mono font-bold text-base text-[#23180f] mt-0.5">
                        {ASSET_MANIFEST.summary.totalExtractedImageFiles} 张
                      </div>
                      <div className="text-[10px] text-[#6b5235]">
                        总计 {formatByteSize(ASSET_MANIFEST.summary.totalExtractedImageBytes)} 独立文件
                      </div>
                    </div>

                    <div className="p-3 rounded bg-[#e3f1e8] border border-[#6ca384]">
                      <div className="text-[#184f35] font-semibold">当前会话已按需加载</div>
                      <div className="font-mono font-bold text-base text-[#134e32] mt-0.5">
                        {telemetry.loadedCount} / {ASSET_MANIFEST.summary.totalExtractedImageFiles} 张
                      </div>
                      <div className="text-[10px] text-[#246344]">
                        实载流量：{formatByteSize(telemetry.loadedBytes)}
                      </div>
                    </div>

                    <div className="p-3 rounded bg-[#efe4cc] border border-[#c8b28e]">
                      <div className="text-[#6b5033]">JS/JSON 内嵌 Base64</div>
                      <div className="font-mono font-bold text-base text-[#1b5132] mt-0.5">
                        0 Bytes
                      </div>
                      <div className="text-[10px] text-[#6b5235]">100% 静态资源解耦</div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5">
                    <div className="p-2.5 rounded bg-[#efe4cc] border border-[#c8b28e]">
                      <div className="font-bold song-serif text-[#52391e]">
                        地区半3D全景 (`public/assets/regions/`)
                      </div>
                      <div className="font-mono text-[#23180f] mt-1">
                        {ASSET_MANIFEST.summary.regionPanoramasCount} 张 ·{' '}
                        {formatByteSize(ASSET_MANIFEST.summary.regionPanoramasBytes)}
                      </div>
                    </div>
                    <div className="p-2.5 rounded bg-[#efe4cc] border border-[#c8b28e]">
                      <div className="font-bold song-serif text-[#52391e]">
                        建筑室内全景 (`public/assets/buildings/`)
                      </div>
                      <div className="font-mono text-[#23180f] mt-1">
                        {ASSET_MANIFEST.summary.buildingPanoramasCount} 张 ·{' '}
                        {formatByteSize(ASSET_MANIFEST.summary.buildingPanoramasBytes)}
                      </div>
                    </div>
                    <div className="p-2.5 rounded bg-[#efe4cc] border border-[#c8b28e]">
                      <div className="font-bold song-serif text-[#52391e]">
                        人物头像/立绘/母版 (`public/assets/characters/`)
                      </div>
                      <div className="font-mono text-[#23180f] mt-1">
                        {ASSET_MANIFEST.summary.characterAvatarsCount +
                          ASSET_MANIFEST.summary.characterFullbodiesCount +
                          ASSET_MANIFEST.summary.characterTemplatesCount}{' '}
                        张 · {formatByteSize(ASSET_MANIFEST.summary.characterAssetsBytes)}
                      </div>
                    </div>
                  </div>

                  <div className="p-3 rounded bg-[#efe4cc] border border-[#c8b28e] space-y-1.5">
                    <div className="font-bold song-serif text-[#52391e]">
                      当前浏览器缓存已按需拉取的资源路径 ({telemetry.loadedUrls.length})
                    </div>
                    <div className="max-h-32 overflow-y-auto scroll-thin bg-[#faf3e3] border border-[#cbb693] rounded p-2 font-mono text-[11px] space-y-0.5">
                      {telemetry.loadedUrls.length === 0 ? (
                        <div className="text-[#6b5235]">尚未加载任何大图资源</div>
                      ) : (
                        telemetry.loadedUrls.map((u) => (
                          <div key={u} className="text-[#1b5132]">
                            ✓ {u}
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* 5 & 6. 存档 / 读档（待 M0-4 接入） */}
              {(activeMenuTab === 'save' || activeMenuTab === 'load') && (
                <div className="space-y-4 text-xs">
                  <div className="p-3 rounded bg-[#efe4cc] border border-[#c8b28e] flex items-center justify-between">
                    <span className="text-[#6b5033]">当前游戏状态锚点</span>
                    <span className="font-semibold song-serif text-[#23180f]">
                      {curNode?.name}（
                      {viewMode === 'world'
                        ? '天下舆图'
                        : viewMode === 'building'
                          ? '建筑半3D内景'
                          : '地区半3D全景'}
                      ）
                    </span>
                  </div>

                  <div className="p-6 rounded-md border-2 border-dashed border-[#bba37c] bg-[#f3ead6] text-center space-y-2">
                    <div className="song-serif font-bold text-base text-[#52391e]">
                      【{activeMeta.label.replace(/\s+/g, '')}】独立容器已预留（对应路线图 M0-4）
                    </div>
                    <p className="text-xs text-[#695036] max-w-lg mx-auto leading-relaxed">
                      状态目前已统一收敛至标准 Zustand Store（`src/store/useGameStore.ts`），待完成 M0-2/M0-3 数据表标准化与核心玩法定稿后，将在此接入多槽位 IndexedDB 持久化与 JSON 快照导入导出。
                    </p>
                  </div>
                </div>
              )}

              {/* 7. 设置面板 */}
              {activeMenuTab === 'settings' && (
                <div className="space-y-3 text-xs">
                  <div className="p-3.5 rounded bg-[#efe4cc] border border-[#c8b28e] flex items-center justify-between">
                    <div>
                      <div className="font-bold song-serif text-[#23180f]">
                        地区与建筑内景牌匾显示
                      </div>
                      <div className="text-[11px] text-[#6b5235]">
                        隐藏后可纯享宋画青绿山水建筑长卷，悬停依然高亮热区
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={toggleRegionLabels}
                      className="px-3 py-1.5 rounded bg-[#5c4024] text-[#fff8ee] font-semibold cursor-pointer"
                    >
                      {showRegionLabels ? '当前：显示牌匾' : '当前：纯赏景模式'}
                    </button>
                  </div>

                  <div className="p-3.5 rounded bg-[#efe4cc] border border-[#c8b28e] flex items-center justify-between">
                    <div>
                      <div className="font-bold song-serif text-[#23180f]">
                        天下舆图文字标注预设
                      </div>
                      <div className="text-[11px] text-[#6b5235]">
                        一键开启全部地名里程标注，或切换为纯净图标视图
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={() => setAllLabelToggles(true)}
                        className="px-2.5 py-1.5 rounded bg-[#5c4024] text-[#fff8ee] cursor-pointer"
                      >
                        全部开启
                      </button>
                      <button
                        type="button"
                        onClick={() => setAllLabelToggles(false)}
                        className="px-2.5 py-1.5 rounded bg-[#dfd0b2] border border-[#8c6e46] text-[#3d2812] cursor-pointer"
                      >
                        全部隐藏
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="pt-3 border-t border-[#d8c7a9] flex items-center justify-between text-xs text-[#6b5235]">
              <span>工程路径：Vite + React 19 + TypeScript + Tailwind CSS v4 + Zustand</span>
              <button
                type="button"
                onClick={closeMenu}
                className="px-4 py-1.5 rounded bg-[#261910] hover:bg-[#3d291a] text-[#fbf2e0] font-bold song-serif transition cursor-pointer"
              >
                收起菜单
              </button>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}
