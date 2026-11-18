import { MOUNT_DB_MAP } from '../../data/gameDb'
import {
  getUnlockedLockedRegionKey,
  REGION_UNLOCK_MAP_REQUIREMENTS,
} from '../../data/itemsDb'
import rawRegionalConfigs from '../../data/regionalConfigs.json'
import rawWorldGraph from '../../data/worldGraph.json'
import type {
  ActionEffect,
  BaseBuildingKey,
  BuildingItem,
  CompiledMountRecord,
  ComputedRoute,
  InventoryStack,
  MountKey,
  RegimeKey,
  RegionConfig,
  RouteSegment,
  TerrainType,
  WildernessCamp,
  WorldGraphData,
  WorldNode,
} from '../../types/game'
import { SHICHEN_LIST } from '../shared/constants'

export { SHICHEN_LIST }

export const WORLD_GRAPH = rawWorldGraph as unknown as WorldGraphData
export const REGIONAL_CONFIGS = rawRegionalConfigs as unknown as Record<string, RegionConfig>

export const NODE_MAP: Record<string, WorldNode> = Object.fromEntries(
  WORLD_GRAPH.nodes.map((n) => [n.id, n]),
)

export interface AdjacencyEdge {
  to: string
  dist: number
  terrain: TerrainType
}

export const ADJACENCY_MAP: Record<string, AdjacencyEdge[]> = (() => {
  const adj: Record<string, AdjacencyEdge[]> = {}
  for (const n of WORLD_GRAPH.nodes) {
    adj[n.id] = []
  }
  for (const [u, v, dist, terrain] of WORLD_GRAPH.edges) {
    adj[u]?.push({ to: v, dist, terrain })
    adj[v]?.push({ to: u, dist, terrain })
  }
  return adj
})()

export interface ResolvedMountMeta {
  key: MountKey
  name: string
  speed: number
  isMounted: boolean
  mountRecord: CompiledMountRecord | null
}

export function resolveMountMeta(mountKey?: MountKey | string | null): ResolvedMountMeta {
  if (mountKey && mountKey !== 'walk') {
    const rec = MOUNT_DB_MAP[mountKey]
    if (rec) {
      return {
        key: rec.id as MountKey,
        name: rec.name,
        speed: rec.baseSpeed,
        isMounted: true,
        mountRecord: rec,
      }
    }
  }
  const walkMeta = WORLD_GRAPH.mounts.walk
  return {
    key: 'walk',
    name: walkMeta.name,
    speed: walkMeta.speed,
    isMounted: false,
    mountRecord: null,
  }
}

export interface SpeedParams {
  mountKey: MountKey
  qinggongBonus: number
  ridingSkill: number
  agility: number
}

/** 骑术满 100 级时，塞外戈壁 / 崇山蜀道的额外地形减速最多抵消此比例 */
export const RIDING_TERRAIN_EASE_MAX = 0.6

/**
 * 骑乘时【骑术】对塞外/蜀道地形减速的抵消：有效地形系数 = 1 + (原系数 - 1) × (1 - 抵消比例)。
 * 步行、官道与水路不受影响。
 */
export function getRidingTerrainCoeff(
  terrainType: TerrainType,
  ridingSkill: number,
  isMounted: boolean,
): number {
  const coeff = WORLD_GRAPH.terrainMeta[terrainType].coeff
  if (!isMounted || coeff <= 1 || (terrainType !== 'steppe' && terrainType !== 'mountain')) {
    return coeff
  }
  const ease = (Math.max(0, Math.min(100, ridingSkill)) / 100) * RIDING_TERRAIN_EASE_MAX
  return 1 + (coeff - 1) * (1 - ease)
}

export function getEffectiveSpeed(params: SpeedParams, terrainType: TerrainType = 'official') {
  const mount = resolveMountMeta(params.mountKey)
  const T = getRidingTerrainCoeff(terrainType, params.ridingSkill, mount.isMounted)
  let modifier = 0
  if (!mount.isMounted) {
    modifier = params.qinggongBonus + params.agility / 250
  } else {
    if (terrainType === 'mountain') {
      modifier = params.ridingSkill / 250 + params.qinggongBonus * 0.9 + params.agility / 500
    } else if (terrainType === 'steppe') {
      modifier = params.ridingSkill / 120 + params.qinggongBonus * 0.35
    } else {
      modifier = params.ridingSkill / 160 + params.qinggongBonus * 0.5
    }
    const rec = mount.mountRecord
    if (rec && (rec.favoredTerrain === 'all' || rec.favoredTerrain === terrainType)) {
      modifier += rec.terrainBonusPct / 100
    }
  }
  const rawSpeed = mount.speed * (1 + modifier)
  return {
    baseDailyLi: Math.round(rawSpeed),
    actualDailyLiOnTerrain: rawSpeed / T,
    modifierPct: Math.round(modifier * 100),
    mountName: mount.name,
    mountBaseSpeed: mount.speed,
    terrainCoeff: T,
  }
}

export function computeSegmentDays(dist: number, terrain: TerrainType, params: SpeedParams): number {
  const { actualDailyLiOnTerrain } = getEffectiveSpeed(params, terrain)
  return dist / actualDailyLiOnTerrain
}

const MAX_ROUTE_CACHE_ENTRIES = 512
const routeCache = new Map<string, ComputedRoute | null>()

function buildRouteCacheKey(
  startId: string,
  targetId: string,
  params: SpeedParams,
  camp?: WildernessCamp | null,
  unlockedKey = 'ALL',
): string {
  const campKey = camp
    ? `${camp.u}:${camp.v}:${camp.distU}:${camp.distV}:${camp.terrain}:${camp.x.toFixed(1)}:${camp.y.toFixed(1)}`
    : ''
  return `${startId}|${targetId}|${params.mountKey}|${params.qinggongBonus.toFixed(4)}|${params.ridingSkill}|${params.agility}|${campKey}|${unlockedKey}`
}

function setBoundedRouteCache(key: string, value: ComputedRoute | null): ComputedRoute | null {
  if (routeCache.size >= MAX_ROUTE_CACHE_ENTRIES) {
    const oldestKey = routeCache.keys().next().value
    if (oldestKey !== undefined) {
      routeCache.delete(oldestKey)
    }
  }
  routeCache.set(key, value)
  return value
}

export function findBestRoute(
  startId: string,
  targetId: string,
  params: SpeedParams,
  camp?: WildernessCamp | null,
  inventoryOrUnlockedKey?: ReadonlyArray<InventoryStack> | string,
): ComputedRoute | null {
  const unlockedKey =
    typeof inventoryOrUnlockedKey === 'string'
      ? inventoryOrUnlockedKey || 'NONE'
      : inventoryOrUnlockedKey
        ? getUnlockedLockedRegionKey(inventoryOrUnlockedKey) || 'NONE'
        : 'NONE'
  const unlockedSet =
    unlockedKey === 'NONE' ? null : new Set(unlockedKey.split(',').filter(Boolean))
  const isNodePassable = (nodeId: string): boolean => {
    if (!(nodeId in REGION_UNLOCK_MAP_REQUIREMENTS)) return true
    return Boolean(unlockedSet?.has(nodeId))
  }

  const cacheKey = buildRouteCacheKey(startId, targetId, params, camp, unlockedKey)
  if (routeCache.has(cacheKey)) {
    return routeCache.get(cacheKey) ?? null
  }

  if (!isNodePassable(targetId) && startId !== targetId) {
    return setBoundedRouteCache(cacheKey, null)
  }

  if (camp) {
    const buildViaEndpoint = (
      endpointId: string,
      rawDistToEndpoint: number,
    ): ComputedRoute | null => {
      if (!isNodePassable(endpointId)) return null
      const firstDist = Math.max(1, Math.round(rawDistToEndpoint))
      const firstDays = Math.max(
        1 / 12,
        computeSegmentDays(Math.max(1, rawDistToEndpoint), camp.terrain, params),
      )
      const rest =
        endpointId === targetId
          ? { nodes: [endpointId], segments: [], totalLi: 0, totalDays: 0 }
          : findBestRoute(endpointId, targetId, params, null, unlockedKey)
      if (!rest) return null
      const firstSeg: RouteSegment = {
        from: '__camp__',
        to: endpointId,
        dist: firstDist,
        terrain: camp.terrain,
        days: firstDays,
        fromCoords: { x: camp.x, y: camp.y },
        campEdge: {
          u: camp.u,
          v: camp.v,
          distU: camp.distU,
          distV: camp.distV,
          terrain: camp.terrain,
        },
      }
      return {
        nodes: ['__camp__', ...rest.nodes],
        segments: [firstSeg, ...rest.segments],
        totalLi: firstDist + rest.totalLi,
        totalDays: firstDays + rest.totalDays,
      }
    }

    const viaU = buildViaEndpoint(camp.u, camp.distU)
    const viaV = buildViaEndpoint(camp.v, camp.distV)
    if (viaU && viaV) {
      return setBoundedRouteCache(cacheKey, viaU.totalDays <= viaV.totalDays ? viaU : viaV)
    }
    return setBoundedRouteCache(cacheKey, viaU ?? viaV)
  }

  if (startId === targetId) {
    return setBoundedRouteCache(cacheKey, {
      nodes: [startId],
      segments: [],
      totalLi: 0,
      totalDays: 0,
    })
  }

  const distDays: Record<string, number> = {}
  const prev: Record<
    string,
    { from: string; dist: number; terrain: TerrainType; days: number }
  > = {}
  const visited = new Set<string>()

  for (const n of WORLD_GRAPH.nodes) {
    distDays[n.id] = Infinity
  }
  distDays[startId] = 0

  while (visited.size < WORLD_GRAPH.nodes.length) {
    let u: string | null = null
    let best = Infinity
    for (const id of Object.keys(distDays)) {
      if (!visited.has(id) && distDays[id] < best) {
        best = distDays[id]
        u = id
      }
    }
    if (!u || u === targetId) break
    visited.add(u)

    for (const edge of ADJACENCY_MAP[u] ?? []) {
      if (visited.has(edge.to)) continue
      if (!isNodePassable(edge.to)) continue
      const stepDays = computeSegmentDays(edge.dist, edge.terrain, params)
      const alt = distDays[u] + stepDays
      if (alt < distDays[edge.to]) {
        distDays[edge.to] = alt
        prev[edge.to] = {
          from: u,
          dist: edge.dist,
          terrain: edge.terrain,
          days: stepDays,
        }
      }
    }
  }

  if (!prev[targetId]) return setBoundedRouteCache(cacheKey, null)

  const nodes: string[] = []
  const segments: ComputedRoute['segments'] = []
  let curr = targetId
  while (curr !== startId) {
    nodes.unshift(curr)
    const p = prev[curr]
    segments.unshift({
      from: p.from,
      to: curr,
      dist: p.dist,
      terrain: p.terrain,
      days: p.days,
    })
    curr = p.from
  }
  nodes.unshift(startId)

  const totalLi = segments.reduce((sum, seg) => sum + seg.dist, 0)
  const totalDays = segments.reduce((sum, seg) => sum + seg.days, 0)
  return setBoundedRouteCache(cacheKey, { nodes, segments, totalLi, totalDays })
}

const MONTHS = [
  '正月',
  '二月',
  '三月',
  '四月',
  '五月',
  '六月',
  '七月',
  '八月',
  '九月',
  '十月',
  '冬月',
  '腊月',
] as const
const SEASONS = ['春', '春', '春', '夏', '夏', '夏', '秋', '秋', '秋', '冬', '冬', '冬'] as const
const CN_DAYS = [
  '',
  '一日',
  '二日',
  '三日',
  '四日',
  '五日',
  '六日',
  '七日',
  '八日',
  '九日',
  '十日',
  '十一日',
  '十二日',
  '十三日',
  '十四日',
  '十五日',
  '十六日',
  '十七日',
  '十八日',
  '十九日',
  '二十日',
  '廿一日',
  '廿二日',
  '廿三日',
  '廿四日',
  '廿五日',
  '廿六日',
  '廿七日',
  '廿八日',
  '廿九日',
  '三十日',
] as const

const CN_DIGITS = ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九'] as const

function formatReignYearNumber(n: number): string {
  if (n <= 1) return '元'
  if (n < 10) return CN_DIGITS[n] ?? String(n)
  if (n === 10) return '十'
  if (n < 20) return `十${CN_DIGITS[n % 10]}`
  const tens = Math.floor(n / 10)
  const ones = n % 10
  if (tens < 10) {
    return `${CN_DIGITS[tens]}十${ones > 0 ? CN_DIGITS[ones] : ''}`
  }
  return String(n)
}

const NORTHERN_SONG_ERAS: ReadonlyArray<{ era: string; startYearNum: number; span: number }> = [
  { era: '皇祐', startYearNum: 2, span: 4 },
  { era: '至和', startYearNum: 1, span: 2 },
  { era: '嘉祐', startYearNum: 1, span: 8 },
  { era: '治平', startYearNum: 1, span: 4 },
  { era: '熙宁', startYearNum: 1, span: 10 },
  { era: '元丰', startYearNum: 1, span: 8 },
  { era: '元祐', startYearNum: 1, span: 8 },
  { era: '绍圣', startYearNum: 1, span: 4 },
  { era: '元符', startYearNum: 1, span: 3 },
  { era: '建中靖国', startYearNum: 1, span: 1 },
  { era: '崇宁', startYearNum: 1, span: 5 },
  { era: '大观', startYearNum: 1, span: 4 },
  { era: '政和', startYearNum: 1, span: 7 },
  { era: '重和', startYearNum: 1, span: 1 },
]

function resolveNorthernSongYearName(yearOffset: number): string {
  let rem = Math.max(0, Math.floor(yearOffset))
  for (const item of NORTHERN_SONG_ERAS) {
    if (rem < item.span) {
      return `${item.era}${formatReignYearNumber(item.startYearNum + rem)}年`
    }
    rem -= item.span
  }
  return `宣和${formatReignYearNumber(1 + rem)}年`
}

export function getSongDateParts(dayTotal: number, shichenIdx = 4) {
  const zeroIdx = Math.max(0, dayTotal - 1)
  const yearOffset = Math.floor(zeroIdx / 360)
  const monthIdx = Math.floor((zeroIdx % 360) / 30)
  const dayInMonth = (zeroIdx % 30) + 1
  const yearName = resolveNorthernSongYearName(yearOffset)
  const normalizedShichen = ((Math.floor(shichenIdx) % 12) + 12) % 12
  const shichen = SHICHEN_LIST[normalizedShichen]
  return {
    yearName,
    season: SEASONS[monthIdx],
    monthName: MONTHS[monthIdx],
    dayName: CN_DAYS[dayInMonth],
    monthDay: `${MONTHS[monthIdx]}${CN_DAYS[dayInMonth]}`,
    shichen,
  }
}

export function formatSongDate(dayTotal: number, shichenIdx?: number): string {
  const p = getSongDateParts(dayTotal, shichenIdx ?? 4)
  if (typeof shichenIdx === 'number') {
    return `${p.yearName} · ${p.season} · ${p.monthDay} · ${p.shichen.name}`
  }
  return `${p.yearName} · ${p.season} · ${p.monthDay}`
}

export function interpolateReignYear(text: string, dayTotal: number): string {
  if (!text.includes('{reignYear}')) return text
  const { yearName } = getSongDateParts(dayTotal)
  return text.replace(/\{reignYear\}/g, yearName)
}

interface BaseBuildingTemplate {
  name: string
  kind: string
  tag: string
  desc: string
  actLabel: string
  cost: number
  effect: ActionEffect
}

export function getCityBaseBuildingsMeta(
  regime?: RegimeKey,
): Record<BaseBuildingKey, BaseBuildingTemplate> {
  const isForeign = Boolean(regime && regime !== 'song')
  return {
    yamen: {
      name: isForeign ? '王庭牙帐 · 番邦官署' : '府州衙门 · 捕盗司',
      kind: 'yamen',
      tag: '官署公门',
      desc: isForeign
        ? '番邦王庭签发通关文牒、军政议事与统辖草原部族之官署。'
        : '州府升堂理事、拜会官长名臣与研习公门策论辩才之官衙。',
      actLabel: '拜会官长捕快 · 研习公门策论与辩才',
      cost: 0,
      effect: { skill: ['策论', 1] },
    },
    tavern: {
      name: isForeign ? '胡姬酒肆 · 马奶酒坊' : '临街酒楼 · 醉仙楼',
      kind: 'tower',
      tag: '江湖风闻',
      desc: isForeign
        ? '胡姬琵琶助兴，塞外刀客、番僧与马帮在此豪饮纵谈。'
        : '酒旗招展、座上豪客云集，打听江湖风闻与跑堂做工之地。',
      actLabel: '跑堂做工领薪（+10两/月） · 饮宴题壁修十艺',
      cost: 2,
      effect: { skill: ['辩才', 3] },
    },
    inn: {
      name: isForeign ? '四方国信馆驿' : '悦来客栈 · 车马店',
      kind: 'manor',
      tag: '投宿调息',
      desc: '备有上房药浴与草料马厩，供远行侠客休整疗伤、恢复周身气血内息。',
      actLabel: '客栈帮工领薪（+10两/月） · 投宿闭关调息',
      cost: 3,
      effect: { hp: 30 },
    },
    dojo: {
      name: isForeign ? '王庭射猎演武场' : '演武拳馆 · 讲武堂',
      kind: 'camp',
      tag: '实战锤炼',
      desc: '设梅花桩、石锁箭垛与比武擂台，可切磋武师、闭关演武与驯马修习骑术。',
      actLabel: '同武师切磋拆招 · 闭关潜修武学与骑术',
      cost: 0,
      effect: { hp: 28, mp: 22 },
    },
    academy: {
      name: isForeign ? '皇家译经院 · 国子讲堂' : '州学书院 · 崇文讲堂',
      kind: 'pavilion',
      tag: '经义算学',
      desc: '书声琅琅、典籍浩瀚，可按日潜修儒释道经义、兵书策论、九章算术与琴棋书画。',
      actLabel: '按日潜修十艺百工（经义 / 策论 / 算术 / 诗词书画）',
      cost: 0,
      effect: { skill: ['经义', 2], skill2: ['策论', 2], skill3: ['算术', 2] },
    },
  }
}

export function getRegionAllBuildings(nodeId: string): BuildingItem[] {
  const node = NODE_MAP[nodeId]
  const cfg = REGIONAL_CONFIGS[nodeId]
  if (!node || !cfg) return []

  const list: BuildingItem[] = []
  cfg.specials.forEach((sp, idx) => {
    list.push({
      id: sp.id,
      name: sp.name,
      kind: sp.kind,
      x: sp.x,
      y: sp.y,
      poly: sp.poly ?? null,
      tag: sp.tag,
      desc: sp.desc,
      actLabel: sp.actLabel,
      cost: sp.cost ?? 0,
      effect: sp.effect,
      isSpecial: true,
      order: idx + 1,
    })
  })

  if (node.type === 'city' && cfg.bases) {
    const baseMeta = getCityBaseBuildingsMeta(node.regime)
    cfg.bases.forEach((b, idx) => {
      const m = baseMeta[b.key]
      if (m) {
        list.push({
          id: `${nodeId}_base_${b.key}`,
          name: b.customName ?? m.name,
          poly: b.poly ?? null,
          kind: m.kind,
          tag: m.tag,
          desc: m.desc,
          actLabel: m.actLabel,
          cost: m.cost,
          effect: m.effect,
          x: b.x,
          y: b.y,
          isSpecial: false,
          order: cfg.specials.length + idx + 1,
        })
      }
    })
  }

  return list
}

export function getRegionViewBoxSize(
  viewMode: 'world' | 'region' | 'building',
  activeRegionId: string,
): [number, number] {
  if (viewMode === 'building') return [1376, 768]
  const cfg = REGIONAL_CONFIGS[activeRegionId]
  if (cfg?.isoViewBox) {
    return cfg.isoViewBox
  }
  return [1376, 768]
}

export function clientToSvgCoords(
  svgEl: SVGSVGElement | null,
  clientX: number,
  clientY: number,
): { x: number; y: number } {
  if (!svgEl) return { x: 800, y: 500 }
  if (svgEl.createSVGPoint && svgEl.getScreenCTM) {
    const ctm = svgEl.getScreenCTM()
    if (ctm) {
      const pt = svgEl.createSVGPoint()
      pt.x = clientX
      pt.y = clientY
      const res = pt.matrixTransform(ctm.inverse())
      return { x: res.x, y: res.y }
    }
  }
  const rect = svgEl.getBoundingClientRect()
  const vb = (svgEl.getAttribute('viewBox') || '0 0 1600 1000').split(/\s+/).map(Number)
  const vw = vb[2] || 1600
  const vh = vb[3] || 1000
  return {
    x: ((clientX - rect.left) / Math.max(1, rect.width)) * vw,
    y: ((clientY - rect.top) / Math.max(1, rect.height)) * vh,
  }
}

/**
 * 钳制地图平移与缩放边界：保证画卷至少保留约 35% 视窗锚定区可见，
 * 既允许任意边角城池/景点放大居中，又防止拖拽滑出屏幕落入纯黑虚空。
 */
export function clampMapPan(
  pan: { x: number; y: number; scale: number },
  viewWidth: number,
  viewHeight: number,
  minScale = 0.56,
  maxScale = 3.4,
): { x: number; y: number; scale: number } {
  const scale = Math.min(maxScale, Math.max(minScale, pan.scale))
  const minX = viewWidth * 0.35 - viewWidth * scale
  const maxX = viewWidth * 0.65
  const minY = viewHeight * 0.35 - viewHeight * scale
  const maxY = viewHeight * 0.65
  return {
    x: Math.min(maxX, Math.max(minX, pan.x)),
    y: Math.min(maxY, Math.max(minY, pan.y)),
    scale,
  }
}

export interface BuildingLockMeta {
  unlockFlag?: string
  lockWhenFlag?: string
  lockedBadge: string
  lockedDesc: string
  lockedReason: string
}

const YANZIWU_RAZED_LOCK_DESC =
  '大宋禁军三千铁甲已踏平太湖燕子坞，参合庄、还施水阁与听香水榭尽付一炬，慕容父子败逃塞外。'

export const QUEST_LOCKED_BUILDINGS: Record<string, BuildingLockMeta> = {
  wl_langhuan: {
    unlockFlag: 'wl_langhuan_unlocked',
    lockedBadge: '秘境未启 · 剧情解锁',
    lockedDesc:
      '无量山谷底绝壁千仞、古藤深锁，飞瀑寒雾终年迷障，外人莫辨洞门所在。须待后续特定任务剧情机缘引路，方可寻得步入之径。',
    lockedReason:
      '谷底藤萝深锁、云雾迷障，暂未寻得【琅嬛福地】入洞秘径（需后续任务剧情解锁）。',
  },
  yzw_canhe: {
    lockWhenFlag: 'jj_mr3_yanziwu_razed',
    lockedBadge: '焦土封禁 · 已化白地',
    lockedDesc: YANZIWU_RAZED_LOCK_DESC,
    lockedReason: '燕子坞庄院已在大火中化为焦土残垣，官军水师封禁此处！',
  },
  yzw_huanshi: {
    lockWhenFlag: 'jj_mr3_yanziwu_razed',
    lockedBadge: '焦土封禁 · 已化白地',
    lockedDesc: YANZIWU_RAZED_LOCK_DESC,
    lockedReason: '燕子坞庄院已在大火中化为焦土残垣，官军水师封禁此处！',
  },
  yzw_tingxiang: {
    lockWhenFlag: 'jj_mr3_yanziwu_razed',
    lockedBadge: '焦土封禁 · 已化白地',
    lockedDesc: YANZIWU_RAZED_LOCK_DESC,
    lockedReason: '燕子坞庄院已在大火中化为焦土残垣，官军水师封禁此处！',
  },
}

function resolveLockMetaState(
  meta: BuildingLockMeta | undefined,
  questFlags?: Record<string, boolean | number | string> | null,
): BuildingLockMeta | null {
  if (!meta) return null
  if (meta.lockWhenFlag) {
    return questFlags && Boolean(questFlags[meta.lockWhenFlag]) ? meta : null
  }
  if (meta.unlockFlag) {
    return questFlags && Boolean(questFlags[meta.unlockFlag]) ? null : meta
  }
  return null
}

export function getBuildingLockMeta(
  buildingId: string | null | undefined,
  questFlags?: Record<string, boolean | number | string> | null,
): BuildingLockMeta | null {
  if (!buildingId) return null
  return resolveLockMetaState(QUEST_LOCKED_BUILDINGS[buildingId], questFlags)
}

export function isBuildingUnlocked(
  buildingId: string | null | undefined,
  questFlags?: Record<string, boolean | number | string> | null,
): boolean {
  return getBuildingLockMeta(buildingId, questFlags) === null
}

export const QUEST_LOCKED_SPOTS: Record<string, BuildingLockMeta> = {
  tg_sg_cave: {
    unlockFlag: 'tg_sg_cave_unlocked',
    lockedBadge: '秘洞深锁 · 剧情解锁',
    lockedDesc:
      '思过崖后洞石门沉重、铁锁封山，非掌门手谕或后续特定机缘不可开启，外门弟子与寻常侠客不得步入。',
    lockedReason:
      '思过崖【秘洞古剑刻石室】重石封门，暂不可入（需后续华山剧情解锁）。',
  },
}

export function getSpotLockMeta(
  spotId: string | null | undefined,
  questFlags?: Record<string, boolean | number | string> | null,
): BuildingLockMeta | null {
  if (!spotId) return null
  return resolveLockMetaState(QUEST_LOCKED_SPOTS[spotId], questFlags)
}
