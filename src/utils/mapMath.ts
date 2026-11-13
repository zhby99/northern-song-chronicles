import rawBuildingPanoramas from '../data/buildingPanoramas.json'
import { MOUNT_DB_MAP } from '../data/gameDb'
import rawPortraitCatalog from '../data/portraitCatalog.json'
import rawRegionalConfigs from '../data/regionalConfigs.json'
import rawWorldGraph from '../data/worldGraph.json'
import type {
  ActionEffect,
  BaseBuildingKey,
  BuildingItem,
  BuildingPanorama,
  CompiledMountRecord,
  ComputedRoute,
  MountKey,
  PortraitCatalogData,
  PortraitCharacter,
  RegimeKey,
  RegionConfig,
  RouteSegment,
  TerrainType,
  WildernessCamp,
  WorldGraphData,
  WorldNode,
} from '../types/game'

export const WORLD_GRAPH = rawWorldGraph as unknown as WorldGraphData
export const REGIONAL_CONFIGS = rawRegionalConfigs as unknown as Record<string, RegionConfig>
export const BUILDING_PANORAMAS = rawBuildingPanoramas as unknown as Record<string, BuildingPanorama>
export const PORTRAIT_CATALOG = rawPortraitCatalog as unknown as PortraitCatalogData

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

const portraitByCleanName = new Map<string, PortraitCharacter>()
for (const ch of PORTRAIT_CATALOG.characters) {
  portraitByCleanName.set(ch.name, ch)
}

export function resolveCharacterByNpcName(npcName: string): PortraitCharacter | null {
  const clean = npcName.replace(/（.*?）|\(.*?\)/g, '').trim()
  return portraitByCleanName.get(clean) ?? portraitByCleanName.get(npcName) ?? null
}

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

export function getEffectiveSpeed(params: SpeedParams, terrainType: TerrainType = 'official') {
  const mount = resolveMountMeta(params.mountKey)
  const T = WORLD_GRAPH.terrainMeta[terrainType].coeff
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
): string {
  const campKey = camp
    ? `${camp.u}:${camp.v}:${camp.distU}:${camp.distV}:${camp.terrain}:${camp.x.toFixed(1)}:${camp.y.toFixed(1)}`
    : ''
  return `${startId}|${targetId}|${params.mountKey}|${params.qinggongBonus.toFixed(4)}|${params.ridingSkill}|${params.agility}|${campKey}`
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
): ComputedRoute | null {
  const cacheKey = buildRouteCacheKey(startId, targetId, params, camp)
  if (routeCache.has(cacheKey)) {
    return routeCache.get(cacheKey) ?? null
  }

  if (camp) {
    const buildViaEndpoint = (
      endpointId: string,
      rawDistToEndpoint: number,
    ): ComputedRoute | null => {
      const firstDist = Math.max(1, Math.round(rawDistToEndpoint))
      const firstDays = Math.max(
        1 / 12,
        computeSegmentDays(Math.max(1, rawDistToEndpoint), camp.terrain, params),
      )
      const rest =
        endpointId === targetId
          ? { nodes: [endpointId], segments: [], totalLi: 0, totalDays: 0 }
          : findBestRoute(endpointId, targetId, params, null)
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

export const SHICHEN_LIST = [
  { idx: 0, name: '子时', period: '夜半', range: '23:00-01:00', isNight: true },
  { idx: 1, name: '丑时', period: '鸡鸣', range: '01:00-03:00', isNight: true },
  { idx: 2, name: '寅时', period: '平旦', range: '03:00-05:00', isNight: true },
  { idx: 3, name: '卯时', period: '日出', range: '05:00-07:00', isNight: false },
  { idx: 4, name: '辰时', period: '食时', range: '07:00-09:00', isNight: false },
  { idx: 5, name: '巳时', period: '隅中', range: '09:00-11:00', isNight: false },
  { idx: 6, name: '午时', period: '日中', range: '11:00-13:00', isNight: false },
  { idx: 7, name: '未时', period: '日昳', range: '13:00-15:00', isNight: false },
  { idx: 8, name: '申时', period: '哺时', range: '15:00-17:00', isNight: false },
  { idx: 9, name: '酉时', period: '日入', range: '17:00-19:00', isNight: false },
  { idx: 10, name: '戌时', period: '黄昏', range: '19:00-21:00', isNight: true },
  { idx: 11, name: '亥时', period: '人定', range: '21:00-23:00', isNight: true },
] as const

export function getSongDateParts(dayTotal: number, shichenIdx = 4) {
  const zeroIdx = Math.max(0, dayTotal - 1)
  const yearOffset = Math.floor(zeroIdx / 360)
  const monthIdx = Math.floor((zeroIdx % 360) / 30)
  const dayInMonth = (zeroIdx % 30) + 1
  const yearNames = ['皇祐二年', '皇祐三年', '皇祐四年', '皇祐五年', '至和元年', '至和二年']
  const yearName = yearNames[Math.min(yearOffset, yearNames.length - 1)]
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
      tag: '官署悬赏',
      desc: isForeign
        ? '番邦王庭签发通关文牒、悬赏缉捕草原剧盗之官署。'
        : '州府升堂理事、张贴江湖海捕文书与发放赏银之官衙。',
      actLabel: '揭榜缉盗领赏（纹银+16两 / 策论+1）',
      cost: 0,
      effect: { silver: 16, skill: ['策论', 1] },
    },
    tavern: {
      name: isForeign ? '胡姬酒肆 · 马奶酒坊' : '临街酒楼 · 醉仙楼',
      kind: 'tower',
      tag: '江湖风闻',
      desc: isForeign
        ? '胡姬琵琶助兴，塞外刀客、番僧与马帮在此豪饮纵谈。'
        : '酒旗招展、座上豪客云集，打听《江湖风闻录》与磨砺辩才之地。',
      actLabel: '痛饮纵论天下（辩才+3，耗银2两）',
      cost: 2,
      effect: { skill: ['辩才', 3] },
    },
    inn: {
      name: isForeign ? '四方国信馆驿' : '悦来客栈 · 车马店',
      kind: 'manor',
      tag: '投宿调息',
      desc: '备有上房药浴与草料马厩，供远行侠客休整疗伤、淬炼寒暑抗性。',
      actLabel: '药浴静养调息（气血+30 / 抗性+1，耗银3两）',
      cost: 3,
      effect: { hp: 30, res: 1 },
    },
    dojo: {
      name: isForeign ? '王庭射猎演武场' : '演武拳馆 · 讲武堂',
      kind: 'camp',
      tag: '实战锤炼',
      desc: '设梅花桩、石锁箭垛与比武擂台，可锤炼实战气血、内力与身法。',
      actLabel: '桩功吐纳拆招（气血+28 / 内力+22 / 身法+1）',
      cost: 0,
      effect: { hp: 28, mp: 22, agi: 1 },
    },
    academy: {
      name: isForeign ? '皇家译经院 · 国子讲堂' : '州学书院 · 崇文讲堂',
      kind: 'pavilion',
      tag: '经义算学',
      desc: '书声琅琅、典籍浩瀚，可系统研习儒释道经义、兵书策论与九章算术。',
      actLabel: '潜心研读经史算学（经义+2 / 策论+2 / 算术+2）',
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
