import { create } from 'zustand'
import type {
  ActionEffect,
  CameraPan,
  LabelToggleKey,
  LogEntry,
  MenuTabKey,
  MountKey,
  NodeNpc,
  OverlayToggles,
  RoamingMaster,
  TooltipPayload,
  TravelState,
  ViewMode,
} from '../types/game'
import {
  ADJACENCY_MAP,
  BUILDING_PANORAMAS,
  findBestRoute,
  formatSongDate,
  getRegionAllBuildings,
  getRegionViewBoxSize,
  NODE_MAP,
  REGIONAL_CONFIGS,
  WORLD_GRAPH,
} from '../utils/mapMath'

const LABEL_KEYS: LabelToggleKey[] = ['cityLabels', 'sectPassLabels', 'masters', 'distance']

interface RoadEventDef {
  tag: string
  msg: string
  apply: (draft: {
    hp: number
    mp: number
    silver: number
    res: number
    skills: Record<string, number>
  }) => void
}

const ROAD_EVENTS: RoadEventDef[] = [
  {
    tag: '胡商偶遇',
    msg: '途遇西域高昌驼队，购得天山雪莲散少许（气血 +35）。',
    apply: (d) => {
      d.hp += 35
    },
  },
  {
    tag: '名侠同行',
    msg: '古道茶寮偶遇游方高僧论及经义内息（内力 +25，经义 +1）。',
    apply: (d) => {
      d.mp += 25
      d.skills['经义'] = Math.min(100, (d.skills['经义'] ?? 60) + 1)
    },
  },
  {
    tag: '绿林劫道',
    msg: '山道窜出剪径匪类，少侠弹指震飞匪首兵刃，缴获纹银 10 两！',
    apply: (d) => {
      d.silver += 10
    },
  },
  {
    tag: '密探截杀',
    msg: '荒野突遭一品堂/辽廷暗探毒箭伏击！凭护体抗性硬接并击退强敌（抗性 +2）。',
    apply: (d) => {
      d.res = Math.min(100, d.res + 2)
    },
  },
  {
    tag: '万里山河',
    msg: '策马纵览九州山海壮阔，胸襟大开，赋词一首（诗词 +2）。',
    apply: (d) => {
      d.skills['诗词'] = Math.min(100, (d.skills['诗词'] ?? 55) + 2)
    },
  },
]

let nextLogSeq = 1
function createLogEntry(dayCount: number, tag: string, text: string, highlight = false): LogEntry {
  const datePart = formatSongDate(dayCount).split(' · ')[2] ?? '正月初一'
  nextLogSeq += 1
  return {
    id: `log-${nextLogSeq}`,
    date: datePart,
    tag,
    text,
    highlight,
  }
}

export interface GameStoreState {
  dayCount: number
  viewMode: ViewMode
  showRegionLabels: boolean
  activeRegionId: string
  activeBuildingInteriorId: string | null
  selectedNodeId: string | null
  selectedBuildingId: string | null
  selectedSpotId: string | null
  currentNodeId: string

  mountKey: MountKey
  qinggongBonus: number
  ridingSkill: number
  agility: number
  silver: number
  food: number
  hp: number
  mp: number
  res: number
  skills: Record<string, number>

  overlays: OverlayToggles
  roamingMasters: RoamingMaster[]
  traveling: TravelState | null

  worldPan: CameraPan
  regionPan: CameraPan

  actionFeedback: { text: string; tone: 'success' | 'warn' | 'talk' } | null
  tooltip: TooltipPayload | null
  logs: LogEntry[]
  logDrawerOpen: boolean

  menuOpen: boolean
  activeMenuTab: MenuTabKey

  // Actions
  setTooltip: (payload: TooltipPayload | null) => void
  moveTooltip: (x: number, y: number) => void
  clearFloatingSelection: () => void
  selectWorldNode: (nodeId: string | null) => void
  selectRegionBuilding: (bldgId: string | null) => void
  selectBuildingSpot: (spotId: string | null) => void

  enterRegionMap: (nodeId: string, logSwitch?: boolean) => void
  enterBuildingMap: (bldgId: string) => void
  exitBuildingMap: () => void
  exitToWorldMap: () => void
  handleUpperLevelBack: () => void

  toggleRegionLabels: () => void
  toggleOverlay: (key: keyof OverlayToggles) => void
  setAllLabelToggles: (enabled: boolean) => void

  setWorldPan: (pan: CameraPan) => void
  zoomWorldBy: (factor: number, cx?: number, cy?: number) => void
  focusZhongyuan: () => void
  focusMacroRegimes: () => void
  resetWorldView: () => void

  setRegionPan: (pan: CameraPan) => void
  zoomRegionBy: (factor: number, cx?: number | null, cy?: number | null) => void
  focusSelectedBuilding: () => void
  resetRegionView: () => void

  setMountKey: (mountKey: MountKey) => void
  setQinggongBonus: (bonus: number) => void
  replenishSupplies: () => void
  doBuildingAction: (item: {
    name: string
    cost?: number
    effect: ActionEffect
  }) => void
  interactNpc: (npc: NodeNpc, mode: 'talk' | 'art' | 'spar') => void

  startJourney: (targetId: string) => void
  stepTravelTick: () => void
  campStop: () => void

  toggleLogDrawer: () => void
  openMenu: (tab?: MenuTabKey) => void
  closeMenu: () => void
  setMenuTab: (tab: MenuTabKey) => void
}

export const useGameStore = create<GameStoreState>((set, get) => ({
  dayCount: 1,
  viewMode: 'region',
  showRegionLabels: true,
  activeRegionId: 'bianliang',
  activeBuildingInteriorId: null,
  selectedNodeId: 'xijin_liao',
  selectedBuildingId: null,
  selectedSpotId: null,
  currentNodeId: 'bianliang',

  mountKey: 'horse',
  qinggongBonus: 0.15,
  ridingSkill: 45,
  agility: 65,
  silver: 120,
  food: 25,
  hp: 1200,
  mp: 950,
  res: 40,
  skills: {
    算术: 52,
    经义: 60,
    策论: 48,
    诗词: 55,
    琴: 42,
    棋: 50,
    书: 46,
    画: 40,
    辩才: 64,
  },

  overlays: {
    cityLabels: true,
    sectPassLabels: true,
    masters: true,
    distance: false,
    factions: false,
    alerts: true,
  },
  roamingMasters: WORLD_GRAPH.roamingMasters.map((m) => ({ ...m })),
  traveling: null,

  worldPan: { x: 0, y: 0, scale: 1 },
  regionPan: { x: 0, y: 0, scale: 1 },

  actionFeedback: null,
  tooltip: null,
  logs: [
    createLogEntry(
      1,
      '工程架构',
      '已完成 M0-1 工程化拆解：209 张静态原画抽离至 public/assets/ 并启用按需懒加载！',
      true,
    ),
    createLogEntry(
      1,
      '东京展卷',
      '当前驻留【开封府】半3D全景舆图。点击左上角可出城纵览三十八州山海，按 ESC 可开启枢机菜单与群侠图鉴。',
      true,
    ),
  ],
  logDrawerOpen: false,

  menuOpen: false,
  activeMenuTab: 'hero',

  setTooltip: (payload) => set({ tooltip: payload }),
  moveTooltip: (x, y) =>
    set((s) => (s.tooltip ? { tooltip: { ...s.tooltip, x, y } } : s)),

  clearFloatingSelection: () => {
    const s = get()
    if (s.viewMode === 'world') {
      set({ selectedNodeId: null, actionFeedback: null })
    } else if (s.viewMode === 'building') {
      set({ selectedSpotId: null, actionFeedback: null })
    } else {
      set({ selectedBuildingId: null, actionFeedback: null })
    }
  },

  selectWorldNode: (nodeId) => set({ selectedNodeId: nodeId, actionFeedback: null }),
  selectRegionBuilding: (bldgId) => set({ selectedBuildingId: bldgId, actionFeedback: null }),
  selectBuildingSpot: (spotId) => set({ selectedSpotId: spotId, actionFeedback: null }),

  enterRegionMap: (nodeId, logSwitch = false) => {
    const s = get()
    const node = NODE_MAP[nodeId]
    const cfg = REGIONAL_CONFIGS[nodeId]
    if (!node || !cfg) return
    if (s.traveling) {
      get().campStop()
    }
    const logs = logSwitch
      ? [createLogEntry(s.dayCount, '地区切换', `展卷踏入【${node.name}】专属半3D全景互动地图。`, true), ...s.logs].slice(0, 60)
      : s.logs

    set({
      tooltip: null,
      viewMode: 'region',
      activeRegionId: nodeId,
      activeBuildingInteriorId: null,
      selectedSpotId: null,
      selectedBuildingId: null,
      currentNodeId: nodeId,
      selectedNodeId: nodeId,
      regionPan: { x: 0, y: 0, scale: 1 },
      actionFeedback: null,
      logs,
    })
  },

  enterBuildingMap: (bldgId) => {
    const s = get()
    const bPano = BUILDING_PANORAMAS[bldgId]
    const node = NODE_MAP[s.activeRegionId]
    if (!bPano || !node) return
    set({
      tooltip: null,
      viewMode: 'building',
      activeBuildingInteriorId: bldgId,
      selectedBuildingId: null,
      selectedSpotId: null,
      regionPan: { x: 0, y: 0, scale: 1 },
      actionFeedback: null,
      logs: [
        createLogEntry(
          s.dayCount,
          '踏入建筑',
          `由【${node.name}】步入【${bPano.name}】专属半3D建筑内景图！`,
          true,
        ),
        ...s.logs,
      ].slice(0, 60),
    })
  },

  exitBuildingMap: () => {
    const s = get()
    if (s.viewMode !== 'building') return
    const prevName =
      (s.activeBuildingInteriorId && BUILDING_PANORAMAS[s.activeBuildingInteriorId]?.name) ||
      '建筑'
    const node = NODE_MAP[s.activeRegionId]
    set({
      tooltip: null,
      viewMode: 'region',
      activeBuildingInteriorId: null,
      selectedBuildingId: null,
      selectedSpotId: null,
      regionPan: { x: 0, y: 0, scale: 1 },
      actionFeedback: null,
      logs: [
        createLogEntry(
          s.dayCount,
          '步出建筑',
          `自【${prevName}】步出，返回【${node?.name ?? '本州'}】地区半3D全景图。`,
        ),
        ...s.logs,
      ].slice(0, 60),
    })
  },

  exitToWorldMap: () => {
    const s = get()
    const node = NODE_MAP[s.currentNodeId]
    set({
      tooltip: null,
      viewMode: 'world',
      activeBuildingInteriorId: null,
      selectedNodeId: null,
      actionFeedback: null,
      logs: [
        createLogEntry(
          s.dayCount,
          '出城返图',
          `自【${node?.name ?? '城池'}】步出城门，重展《华夏山海全景舆图》。`,
        ),
        ...s.logs,
      ].slice(0, 60),
    })
  },

  handleUpperLevelBack: () => {
    if (get().viewMode === 'building') {
      get().exitBuildingMap()
    } else {
      get().exitToWorldMap()
    }
  },

  toggleRegionLabels: () => set((s) => ({ showRegionLabels: !s.showRegionLabels })),

  toggleOverlay: (key) =>
    set((s) => ({
      overlays: { ...s.overlays, [key]: !s.overlays[key] },
    })),

  setAllLabelToggles: (enabled) =>
    set((s) => {
      const next = { ...s.overlays }
      for (const k of LABEL_KEYS) {
        next[k] = enabled
      }
      return { overlays: next }
    }),

  setWorldPan: (pan) => set({ worldPan: pan }),

  zoomWorldBy: (factor, cx = 800, cy = 500) =>
    set((s) => {
      const nextScale = Math.min(3.4, Math.max(0.56, s.worldPan.scale * factor))
      const ratio = nextScale / s.worldPan.scale
      return {
        worldPan: {
          x: cx - (cx - s.worldPan.x) * ratio,
          y: cy - (cy - s.worldPan.y) * ratio,
          scale: nextScale,
        },
      }
    }),

  focusZhongyuan: () => set({ worldPan: { x: -340, y: -165, scale: 1.48 } }),
  focusMacroRegimes: () => set({ worldPan: { x: 185, y: 112, scale: 0.74 } }),
  resetWorldView: () => set({ worldPan: { x: 0, y: 0, scale: 1 } }),

  setRegionPan: (pan) => set({ regionPan: pan }),

  zoomRegionBy: (factor, cx = null, cy = null) =>
    set((s) => {
      const [vw, vh] = getRegionViewBoxSize(s.viewMode, s.activeRegionId)
      const pivotX = cx !== null ? cx : vw / 2
      const pivotY = cy !== null ? cy : vh / 2
      const nextScale = Math.min(4.2, Math.max(0.62, s.regionPan.scale * factor))
      const ratio = nextScale / s.regionPan.scale
      return {
        regionPan: {
          x: pivotX - (pivotX - s.regionPan.x) * ratio,
          y: pivotY - (pivotY - s.regionPan.y) * ratio,
          scale: nextScale,
        },
      }
    }),

  focusSelectedBuilding: () => {
    const s = get()
    const [vw, vh] = getRegionViewBoxSize(s.viewMode, s.activeRegionId)
    let target: { x: number; y: number } | null = null

    if (
      s.viewMode === 'building' &&
      s.activeBuildingInteriorId &&
      BUILDING_PANORAMAS[s.activeBuildingInteriorId]
    ) {
      const bPano = BUILDING_PANORAMAS[s.activeBuildingInteriorId]
      target = s.selectedSpotId
        ? (bPano.spots.find((sp) => sp.id === s.selectedSpotId) ?? null)
        : null
    } else {
      const buildings = getRegionAllBuildings(s.activeRegionId)
      target = s.selectedBuildingId
        ? (buildings.find((b) => b.id === s.selectedBuildingId) ?? null)
        : null
    }

    if (!target) {
      set({
        actionFeedback: {
          text: '请先点击画中建筑或内景热区选中一处地点，再使用「聚焦」。',
          tone: 'warn',
        },
      })
      return
    }

    const targetScale = 2.05
    set({
      regionPan: {
        x: vw / 2 - target.x * targetScale,
        y: vh / 2 - target.y * targetScale,
        scale: targetScale,
      },
    })
  },

  resetRegionView: () => set({ regionPan: { x: 0, y: 0, scale: 1 } }),

  setMountKey: (mountKey) => set({ mountKey }),
  setQinggongBonus: (qinggongBonus) => set({ qinggongBonus }),

  replenishSupplies: () => {
    const s = get()
    if (s.silver < 5) {
      set({
        logs: [createLogEntry(s.dayCount, '市集', '纹银不足 5 两，无法补给干粮！', true), ...s.logs].slice(
          0,
          60,
        ),
      })
      return
    }
    set({
      silver: s.silver - 5,
      food: s.food + 20,
      logs: [
        createLogEntry(s.dayCount, '补给', '花费 5 两纹银购入行军干粮 +20 日份。'),
        ...s.logs,
      ].slice(0, 60),
    })
  },

  doBuildingAction: (item) => {
    const s = get()
    const cost = item.cost ?? 0
    if (cost > 0 && s.silver < cost) {
      set({
        actionFeedback: {
          text: `囊中羞涩，纹银不足 ${cost} 两！可先去衙门揭榜领赏。`,
          tone: 'warn',
        },
      })
      return
    }

    let nextSilver = s.silver - cost
    let nextHp = s.hp
    let nextMp = s.mp
    let nextAgi = s.agility
    let nextRes = s.res
    let nextRiding = s.ridingSkill
    const nextSkills = { ...s.skills }
    const nextDay = s.dayCount + 1

    const eff = item.effect
    const gains: string[] = []

    if (eff.hp) {
      nextHp += eff.hp
      gains.push(`气血 +${eff.hp}（现 ${nextHp}）`)
    }
    if (eff.mp) {
      nextMp += eff.mp
      gains.push(`内力 +${eff.mp}（现 ${nextMp}）`)
    }
    if (eff.agi) {
      nextAgi = Math.min(100, nextAgi + eff.agi)
      gains.push(`身法 +${eff.agi}（现 ${nextAgi}）`)
    }
    if (eff.res) {
      nextRes = Math.min(100, nextRes + eff.res)
      gains.push(`抗性 +${eff.res}（现 ${nextRes}）`)
    }
    if (eff.riding) {
      nextRiding = Math.min(100, nextRiding + eff.riding)
      gains.push(`骑术 +${eff.riding}（现 ${nextRiding}/100）`)
    }
    if (eff.silver) {
      nextSilver += eff.silver
      gains.push(`纹银 +${eff.silver} 两`)
    }

    const tuples = [eff.skill, eff.skill2, eff.skill3]
    for (const tup of tuples) {
      if (tup) {
        const [sName, delta] = tup
        nextSkills[sName] = Math.min(100, (nextSkills[sName] ?? 40) + delta)
        gains.push(`【${sName}】+${delta}（现 ${nextSkills[sName]}/100）`)
      }
    }

    const summary = `于【${item.name}】潜心修历一日：${gains.join('、')}！`
    const regionName = NODE_MAP[s.activeRegionId]?.name ?? '江湖'
    let nextLogs = [createLogEntry(nextDay, regionName, summary), ...s.logs]
    let nextMasters = s.roamingMasters

    if ((nextDay - 1) % 30 === 0) {
      nextMasters = s.roamingMasters.map((m) => {
        const neighbors = ADJACENCY_MAP[m.nodeId] ?? []
        if (neighbors.length === 0) return m
        const pick = neighbors[Math.floor(Math.random() * neighbors.length)]
        return { ...m, nodeId: pick.to }
      })
      const sample = nextMasters[Math.floor(Math.random() * nextMasters.length)]
      if (sample) {
        nextLogs = [
          createLogEntry(
            nextDay,
            '月度风云',
            `《天下江湖风闻录》更新：【${sample.name}】近日现身于【${NODE_MAP[sample.nodeId]?.name ?? sample.nodeId}】！`,
            true,
          ),
          ...nextLogs,
        ]
      }
    }

    set({
      dayCount: nextDay,
      silver: nextSilver,
      hp: nextHp,
      mp: nextMp,
      agility: nextAgi,
      res: nextRes,
      ridingSkill: nextRiding,
      skills: nextSkills,
      roamingMasters: nextMasters,
      actionFeedback: { text: summary, tone: 'success' },
      logs: nextLogs.slice(0, 60),
    })
  },

  interactNpc: (npc, mode) => {
    const s = get()
    if (mode === 'talk') {
      set({
        actionFeedback: {
          text: `${npc.name}：${npc.talk}`,
          tone: 'talk',
        },
      })
      return
    }
    if (mode === 'art') {
      const nextSkills = {
        ...s.skills,
        诗词: Math.min(100, (s.skills['诗词'] ?? 55) + 2),
        琴: Math.min(100, (s.skills['琴'] ?? 42) + 1),
      }
      set({
        skills: nextSkills,
        actionFeedback: {
          text: `与 ${npc.name} 抚琴唱和、对弈品茗（【诗词】${nextSkills['诗词']}/100、【琴】${nextSkills['琴']}/100）。`,
          tone: 'success',
        },
      })
      return
    }
    set({
      mp: s.mp + 18,
      actionFeedback: {
        text: `向 ${npc.name}（${npc.realm}）请益实战拆招，内力 +18！`,
        tone: 'success',
      },
    })
  },

  startJourney: (targetId) => {
    const s = get()
    if (s.traveling) return
    const route = findBestRoute(s.currentNodeId, targetId, {
      mountKey: s.mountKey,
      qinggongBonus: s.qinggongBonus,
      ridingSkill: s.ridingSkill,
      agility: s.agility,
    })
    if (!route || route.segments.length === 0) return

    if (s.food <= 0) {
      set({
        logs: [
          createLogEntry(
            s.dayCount,
            '粮尽警示',
            '行囊干粮已尽！请先开启【菜单 -> 背包】补给干粮再远征塞外。',
            true,
          ),
          ...s.logs,
        ].slice(0, 60),
      })
      return
    }

    const currNode = NODE_MAP[s.currentNodeId]
    const targetNode = NODE_MAP[targetId]
    set({
      viewMode: 'world',
      tooltip: null,
      actionFeedback: null,
      traveling: {
        targetId,
        route,
        segIdx: 0,
        segProgressDays: 0,
        dayAccumulator: 0,
        playerPos: { x: currNode?.x ?? 856, y: currNode?.y ?? 380 },
      },
      logs: [
        createLogEntry(
          s.dayCount,
          '启程',
          `自【${currNode?.name ?? s.currentNodeId}】策马出发，奔赴【${targetNode?.name ?? targetId}】（全程 ${route.totalLi} 里）。`,
          true,
        ),
        ...s.logs,
      ].slice(0, 60),
    })
  },

  stepTravelTick: () => {
    const s = get()
    const tr = s.traveling
    if (!tr) return

    const stepDay = 0.6
    const seg = tr.route.segments[tr.segIdx]
    if (!seg) return

    let segProgressDays = tr.segProgressDays + stepDay
    let dayAccumulator = tr.dayAccumulator + stepDay
    const ratio = Math.min(1, segProgressDays / seg.days)
    const fromNode = NODE_MAP[seg.from]
    const toNode = NODE_MAP[seg.to]
    const curX = fromNode.x + (toNode.x - fromNode.x) * ratio
    const curY = fromNode.y + (toNode.y - fromNode.y) * ratio

    let nextDayCount = s.dayCount
    let nextFood = s.food
    let nextSilver = s.silver
    let nextHp = s.hp
    let nextMp = s.mp
    let nextRes = s.res
    const nextSkills = { ...s.skills }
    let nextLogs = [...s.logs]
    let nextMasters = s.roamingMasters

    if (dayAccumulator >= 1.0) {
      dayAccumulator -= 1.0
      nextDayCount += 1
      if (nextFood > 0) nextFood -= 1
      else if (nextSilver >= 2) nextSilver -= 2

      if (Math.random() < 0.16) {
        const ev = ROAD_EVENTS[Math.floor(Math.random() * ROAD_EVENTS.length)]
        if (ev) {
          const draft = {
            hp: nextHp,
            mp: nextMp,
            silver: nextSilver,
            res: nextRes,
            skills: nextSkills,
          }
          ev.apply(draft)
          nextHp = draft.hp
          nextMp = draft.mp
          nextSilver = draft.silver
          nextRes = draft.res
          nextLogs.unshift(createLogEntry(nextDayCount, ev.tag, ev.msg, true))
        }
      }

      if ((nextDayCount - 1) % 30 === 0) {
        nextMasters = s.roamingMasters.map((m) => {
          const neighbors = ADJACENCY_MAP[m.nodeId] ?? []
          if (neighbors.length === 0) return m
          const pick = neighbors[Math.floor(Math.random() * neighbors.length)]
          return { ...m, nodeId: pick.to }
        })
        const sample = nextMasters[Math.floor(Math.random() * nextMasters.length)]
        if (sample) {
          nextLogs.unshift(
            createLogEntry(
              nextDayCount,
              '月度风云',
              `《天下江湖风闻录》更新：【${sample.name}】近日现身于【${NODE_MAP[sample.nodeId]?.name ?? sample.nodeId}】！`,
              true,
            ),
          )
        }
      }
    }

    if (ratio >= 1) {
      const arrivedNodeId = seg.to
      const nextSegIdx = tr.segIdx + 1
      if (nextSegIdx >= tr.route.segments.length) {
        const destName = NODE_MAP[arrivedNodeId]?.name ?? arrivedNodeId
        nextLogs.unshift(
          createLogEntry(
            nextDayCount,
            '抵达入图',
            `千里风霜，顺利抵达【${destName}】！主视口已按需展开【${destName}】半3D全景舆图。`,
            true,
          ),
        )
        set({
          dayCount: nextDayCount,
          food: nextFood,
          silver: nextSilver,
          hp: nextHp,
          mp: nextMp,
          res: nextRes,
          skills: nextSkills,
          roamingMasters: nextMasters,
          traveling: null,
          currentNodeId: arrivedNodeId,
          selectedNodeId: arrivedNodeId,
          activeRegionId: arrivedNodeId,
          activeBuildingInteriorId: null,
          selectedBuildingId: null,
          selectedSpotId: null,
          viewMode: 'region',
          regionPan: { x: 0, y: 0, scale: 1 },
          logs: nextLogs.slice(0, 60),
        })
        return
      }

      nextLogs.unshift(
        createLogEntry(
          nextDayCount,
          '途经',
          `途经要冲【${NODE_MAP[arrivedNodeId]?.name ?? arrivedNodeId}】，换马饮水后继续前行。`,
        ),
      )
      segProgressDays = 0
      set({
        dayCount: nextDayCount,
        food: nextFood,
        silver: nextSilver,
        hp: nextHp,
        mp: nextMp,
        res: nextRes,
        skills: nextSkills,
        roamingMasters: nextMasters,
        currentNodeId: arrivedNodeId,
        traveling: {
          ...tr,
          segIdx: nextSegIdx,
          segProgressDays,
          dayAccumulator,
          playerPos: { x: toNode.x, y: toNode.y },
        },
        logs: nextLogs.slice(0, 60),
      })
      return
    }

    set({
      dayCount: nextDayCount,
      food: nextFood,
      silver: nextSilver,
      hp: nextHp,
      mp: nextMp,
      res: nextRes,
      skills: nextSkills,
      roamingMasters: nextMasters,
      traveling: {
        ...tr,
        segProgressDays,
        dayAccumulator,
        playerPos: { x: curX, y: curY },
      },
      logs: nextLogs.slice(0, 60),
    })
  },

  campStop: () => {
    const s = get()
    if (!s.traveling) return
    const seg = s.traveling.route.segments[s.traveling.segIdx]
    const ratio = seg ? s.traveling.segProgressDays / seg.days : 0
    const stopNodeId = seg ? (ratio >= 0.5 ? seg.to : seg.from) : s.currentNodeId
    const stopName = NODE_MAP[stopNodeId]?.name ?? stopNodeId
    set({
      traveling: null,
      currentNodeId: stopNodeId,
      selectedNodeId: stopNodeId,
      logs: [
        createLogEntry(s.dayCount, '驻扎露营', `少侠收缰驻马，就近于【${stopName}】安营休整。`),
        ...s.logs,
      ].slice(0, 60),
    })
  },

  toggleLogDrawer: () => set((s) => ({ logDrawerOpen: !s.logDrawerOpen })),

  openMenu: (tab) =>
    set((s) => ({
      menuOpen: true,
      tooltip: null,
      activeMenuTab: tab ?? s.activeMenuTab,
    })),

  closeMenu: () => set({ menuOpen: false }),
  setMenuTab: (tab) => set({ activeMenuTab: tab }),
}))
