import type { StoreSlice } from '../storeTypes'
import {
  BUILDING_DB_MAP,
  NPC_DB_MAP,
} from '../../data/gameDb'
import {
  getRegionUnlockRequirement,
  isRegionUnlockedByInventory,
} from '../../data/itemsDb'
import type {
  NodeNpc,
  WildernessCamp,
} from '../../types/game'
import {
  NORTH_CHINA_REGION_IDS,
  TAIHANG_BANDIT_ENCOUNTER_SCENE,
  TAIHANG_BANDIT_QUEST_ID,
  TAIHANG_LEADERS_AMBUSH_SCENE,
} from '../../data/quests/sects/kaifengTaihangBanditQuest'
import {
  cloneHeroBaseStats,
  DAILY_INN_LODGING_COST,
  deriveHeroEffectiveStats,
} from '../../utils/heroStats'
import { syncArtLevelsToExpsAndMilestones } from '../../utils/artsProgression'
import {
  ADJACENCY_MAP,
  findBestRoute,
  getBuildingLockMeta,
  getRegionAllBuildings,
  getRegionViewBoxSize,
  NODE_MAP,
  REGIONAL_CONFIGS,
} from '../../utils/mapMath'
import { buildZhanZhaoArrestNodeNpc } from '../../utils/sectMechanics'
import {
  LABEL_KEYS,
  ROAD_EVENTS,
  createLogEntry,
  applyDailyVitalityRecovery,
  applyDayProgressionSectHooks,
} from '../storeHelpers'

export type NavigationTravelKeys =
  | 'selectWorldNode'
  | 'selectRegionBuilding'
  | 'selectBuildingSpot'
  | 'enterRegionMap'
  | 'enterBuildingMap'
  | 'exitBuildingMap'
  | 'exitToWorldMap'
  | 'handleUpperLevelBack'
  | 'toggleRegionLabels'
  | 'toggleOverlay'
  | 'setAllLabelToggles'
  | 'setWorldPan'
  | 'zoomWorldBy'
  | 'focusZhongyuan'
  | 'focusMacroRegimes'
  | 'resetWorldView'
  | 'setRegionPan'
  | 'zoomRegionBy'
  | 'focusSelectedBuilding'
  | 'resetRegionView'
  | 'locateQuestTargetOnMap'
  | 'startJourney'
  | 'stepTravelTick'
  | 'campStop'
  | 'navigateToNpcLeafInCurrentRegion'

export const createNavigationTravelSlice: StoreSlice<NavigationTravelKeys> = (set, get) => ({
  selectWorldNode: (nodeId) => set({ selectedNodeId: nodeId, actionFeedback: null }),
  selectRegionBuilding: (bldgId) => {
    if (bldgId) {
      const lockMeta = getBuildingLockMeta(bldgId, get().questState.flags)
      if (lockMeta) {
        set({
          actionFeedback: {
            text: `🔒 ${lockMeta.lockedReason}`,
            tone: 'warn',
          },
        })
        return
      }
    }
    set({ selectedBuildingId: bldgId, actionFeedback: null })
    if (bldgId) {
      const s = get()
      const bRec = BUILDING_DB_MAP[bldgId]
      // Base city buildings have no interior sub-map; selecting them visits the leaf building
      if (!bRec?.interior && s.currentNodeId === s.activeRegionId && !s.campPos && !s.traveling) {
        get().fireLocationTriggersForCurrentSpot({
          regionId: s.activeRegionId,
          buildingId: bldgId,
          spotId: null,
        })
      }
    }
  },
  selectBuildingSpot: (spotId) => {
    set({ selectedSpotId: spotId, actionFeedback: null })
    if (spotId) {
      const s = get()
      if (
        s.activeBuildingInteriorId &&
        s.currentNodeId === s.activeRegionId &&
        !s.campPos &&
        !s.traveling
      ) {
        get().fireLocationTriggersForCurrentSpot({
          regionId: s.activeRegionId,
          buildingId: s.activeBuildingInteriorId,
          spotId,
        })
      }
    }
  },

  enterRegionMap: (nodeId, logSwitch = false) => {
    const s = get()
    const node = NODE_MAP[nodeId]
    const cfg = REGIONAL_CONFIGS[nodeId]
    if (!node || !cfg) return
    if (!isRegionUnlockedByInventory(nodeId, s.inventory)) {
      const req = getRegionUnlockRequirement(nodeId)
      const warnMsg = req
        ? `【${req.regionName}】水道/绝域迷障重重，须先取得${req.mapItemName}方可踏入！`
        : `【${node.name}】尚未取得对应舆图，当前不可抵达！`
      set({
        actionFeedback: { text: warnMsg, tone: 'warn' },
        logs: [createLogEntry(s.dayCount, '秘境未通', warnMsg, true, s.shichenIdx), ...s.logs].slice(
          0,
          60,
        ),
      })
      return
    }
    if (s.traveling) {
      get().campStop()
    }
    const isKaifengAmbush =
      nodeId === 'bianliang' &&
      (s.sectState.songCourtBlacklisted || Boolean(s.questState.flags.song_court_blacklisted))
    let logs = logSwitch
      ? [
          createLogEntry(
            s.dayCount,
            '地区切换',
            `展卷踏入【${node.name}】专属半3D全景互动地图。`,
            true,
          ),
          ...s.logs,
        ].slice(0, 60)
      : s.logs

    if (isKaifengAmbush) {
      logs = [
        createLogEntry(
          s.dayCount,
          '开封缉捕',
          '少侠身负劫掠大宋朝廷官员之海捕黑名单，甫一踏入东京开封府，御前四品带刀护卫「南侠」展昭已执剑拦路，不死不休！',
          true,
          s.shichenIdx,
        ),
        ...logs,
      ].slice(0, 60)
    }

    set({
      tooltip: null,
      viewMode: 'region',
      activeRegionId: nodeId,
      activeBuildingInteriorId: null,
      selectedSpotId: null,
      selectedBuildingId: null,
      currentNodeId: nodeId,
      selectedNodeId: nodeId,
      campPos: null,
      regionPan: { x: 0, y: 0, scale: 1 },
      actionFeedback: null,
      logs,
    })

    get().fireLocationTriggersForCurrentSpot({
      regionId: nodeId,
      buildingId: null,
      spotId: null,
    })

    if (isKaifengAmbush && !get().activeStoryScene && !get().activeCombat && !get().gameOver) {
      get().startNpcCombat(buildZhanZhaoArrestNodeNpc(), 'duel', 'zhan_zhao_arrest', true)
      return
    }

    if (logSwitch && !get().activeStoryScene && !get().activeCombat && !get().gameOver) {
      void get().saveToSlot('autosave', `踏入${node.name}`, true)
    }
  },

  enterBuildingMap: (bldgId) => {
    const s = get()
    const lockMeta = getBuildingLockMeta(bldgId, s.questState.flags)
    if (lockMeta) {
      set({
        actionFeedback: {
          text: `🔒 ${lockMeta.lockedReason}`,
          tone: 'warn',
        },
      })
      return
    }
    const bRecord = BUILDING_DB_MAP[bldgId]
    const node = NODE_MAP[s.activeRegionId]
    if (!bRecord || !bRecord.interior || !node) return
    const hasSubSpots = bRecord.interior.spots.length > 0
    const modeDesc =
      bRecord.interior.mode === 'image'
        ? '半3D手绘建筑内景图'
        : hasSubSpots
          ? '宋式营造矢量内景卷'
          : '市井独堂实景（无子建筑）'
    set({
      tooltip: null,
      viewMode: 'building',
      activeBuildingInteriorId: bldgId,
      selectedBuildingId: hasSubSpots ? null : bldgId,
      selectedSpotId: null,
      regionPan: { x: 0, y: 0, scale: 1 },
      actionFeedback: null,
      logs: [
        createLogEntry(
          s.dayCount,
          '踏入建筑',
          `由【${node.name}】步入【${bRecord.name}】（${modeDesc}）！`,
          true,
        ),
        ...s.logs,
      ].slice(0, 60),
    })

    if (s.currentNodeId === s.activeRegionId && !s.campPos && !s.traveling) {
      get().fireLocationTriggersForCurrentSpot({
        regionId: s.activeRegionId,
        buildingId: bldgId,
        spotId: null,
      })
    }
  },

  exitBuildingMap: () => {
    const s = get()
    if (s.viewMode !== 'building') return
    const prevName =
      (s.activeBuildingInteriorId && BUILDING_DB_MAP[s.activeBuildingInteriorId]?.name) || '建筑'
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
    if (s.currentNodeId === s.activeRegionId && !s.campPos && !s.traveling) {
      get().fireLocationTriggersForCurrentSpot({
        regionId: s.activeRegionId,
        buildingId: null,
        spotId: null,
      })
    }
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

    if (s.viewMode === 'building' && s.activeBuildingInteriorId) {
      const bInterior = BUILDING_DB_MAP[s.activeBuildingInteriorId]?.interior
      if (bInterior) {
        if (bInterior.spots.length === 0) {
          target = { x: vw / 2, y: vh / 2 - 36 }
        } else {
          target = s.selectedSpotId
            ? (bInterior.spots.find((sp) => sp.id === s.selectedSpotId) ?? null)
            : null
        }
      }
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

  locateQuestTargetOnMap: (target) => {
    const s = get()
    const regNode = NODE_MAP[target.regionId]
    if (!regNode) return

    if (s.currentNodeId === target.regionId && !s.campPos && !s.traveling) {
      const targetLock = target.buildingId
        ? getBuildingLockMeta(target.buildingId, s.questState.flags)
        : null
      if (target.buildingId && !targetLock) {
        const bRec = BUILDING_DB_MAP[target.buildingId]
        if (bRec?.interior) {
          set({
            menuOpen: false,
            compendiumOpen: false,
            tooltip: null,
            viewMode: 'building',
            activeRegionId: target.regionId,
            activeBuildingInteriorId: bRec.id,
            selectedBuildingId: target.spotId ? null : bRec.id,
            selectedSpotId: target.spotId ?? null,
            regionPan: { x: 0, y: 0, scale: 1 },
            actionFeedback: {
              text: `已循任务卷宗步入【${target.customLabel ?? bRec.name}】！`,
              tone: 'success',
            },
          })
          if (target.spotId) {
            get().fireLocationTriggersForCurrentSpot({
              regionId: target.regionId,
              buildingId: bRec.id,
              spotId: target.spotId,
            })
          } else {
            get().fireLocationTriggersForCurrentSpot({
              regionId: target.regionId,
              buildingId: bRec.id,
              spotId: null,
            })
          }
          return
        }
        if (bRec) {
          set({
            menuOpen: false,
            compendiumOpen: false,
            tooltip: null,
            viewMode: 'region',
            activeRegionId: target.regionId,
            activeBuildingInteriorId: null,
            selectedBuildingId: bRec.id,
            selectedSpotId: null,
            regionPan: { x: 0, y: 0, scale: 1 },
            actionFeedback: {
              text: `已定位至本州【${target.customLabel ?? bRec.name}】！`,
              tone: 'success',
            },
          })
          get().fireLocationTriggersForCurrentSpot({
            regionId: target.regionId,
            buildingId: bRec.id,
            spotId: null,
          })
          return
        }
      }
      set({
        menuOpen: false,
        compendiumOpen: false,
        tooltip: null,
        viewMode: 'region',
        activeRegionId: target.regionId,
        activeBuildingInteriorId: null,
        selectedBuildingId: null,
        selectedSpotId: null,
        actionFeedback: {
          text: `少侠当前正身处【${regNode.name}】境内！`,
          tone: 'talk',
        },
      })
      return
    }

    const isUnlocked = isRegionUnlockedByInventory(target.regionId, s.inventory)
    const lockReq = !isUnlocked ? getRegionUnlockRequirement(target.regionId) : null

    set({
      menuOpen: false,
      compendiumOpen: false,
      tooltip: null,
      viewMode: 'world',
      activeBuildingInteriorId: null,
      selectedNodeId: target.regionId,
      worldPan: { x: 0, y: 0, scale: 1 },
      actionFeedback: lockReq
        ? {
            text: `【${lockReq.regionName}】尚未解锁航道/山道！须先获得${lockReq.mapItemName}方可抵达（${lockReq.questTitleHint}）。`,
            tone: 'warn',
          }
        : {
            text: `已在天下舆图锁定目标州府【${target.customLabel ?? regNode.name}】，点击右侧【启程前往】即可策马奔赴！`,
            tone: 'success',
          },
    })
  },

  startJourney: (targetId) => {
    const s = get()
    if (s.traveling) return
    if (!isRegionUnlockedByInventory(targetId, s.inventory)) {
      const req = getRegionUnlockRequirement(targetId)
      const warnMsg = req
        ? `【${req.regionName}】水陆迷障封锁，须先获得${req.mapItemName}方可启程前往！`
        : `尚未取得前往该秘境的舆图，当前不可抵达！`
      set({
        actionFeedback: { text: warnMsg, tone: 'warn' },
        logs: [createLogEntry(s.dayCount, '航道未通', warnMsg, true, s.shichenIdx), ...s.logs].slice(
          0,
          60,
        ),
      })
      return
    }
    const route = findBestRoute(
      s.currentNodeId,
      targetId,
      {
        mountKey: s.mountKey,
        qinggongBonus: s.qinggongBonus,
        ridingSkill: s.ridingSkill,
        agility: s.agility,
      },
      s.campPos,
      s.inventory,
    )
    if (!route || route.segments.length === 0) return

    if (s.food <= 0) {
      set({
        logs: [
          createLogEntry(
            s.dayCount,
            '粮尽警示',
            '行囊粮草已尽！请点击顶部状态栏【粮草】或开启背包补给后再远征。',
            true,
            s.shichenIdx,
          ),
          ...s.logs,
        ].slice(0, 60),
      })
      return
    }

    const currNode = NODE_MAP[s.currentNodeId]
    const targetNode = NODE_MAP[targetId]
    const wasCamped = Boolean(s.campPos)
    const startPos = s.campPos
      ? { x: s.campPos.x, y: s.campPos.y }
      : { x: currNode?.x ?? 856, y: currNode?.y ?? 380 }
    set({
      viewMode: 'world',
      tooltip: null,
      actionFeedback: null,
      campPos: null,
      traveling: {
        targetId,
        route,
        segIdx: 0,
        segProgressDays: 0,
        dayAccumulator: 0,
        playerPos: startPos,
      },
      logs: [
        createLogEntry(
          s.dayCount,
          '启程',
          wasCamped
            ? `拔营启程，自旷野营地策马直奔【${targetNode?.name ?? targetId}】（全程 ${route.totalLi} 里）。`
            : `自【${currNode?.name ?? s.currentNodeId}】策马出发，奔赴【${targetNode?.name ?? targetId}】（全程 ${route.totalLi} 里）。`,
          true,
          s.shichenIdx,
        ),
        ...s.logs,
      ].slice(0, 60),
    })
  },

  stepTravelTick: () => {
    const s = get()
    const tr = s.traveling
    if (!tr) return

    // 行路时钟铁律：每 tick（0.25s）前进一步（整整一个时辰 = 1/12 日），一日十二时辰累计 3.0s
    const stepDay = 1 / 12
    const seg = tr.route.segments[tr.segIdx]
    if (!seg) return

    let segProgressDays = tr.segProgressDays + stepDay
    let dayAccumulator = tr.dayAccumulator + stepDay
    const ratio = Math.min(1, segProgressDays / seg.days)
    const fromPos = seg.fromCoords ?? NODE_MAP[seg.from]
    const toNode = NODE_MAP[seg.to]
    const curX = fromPos.x + (toNode.x - fromPos.x) * ratio
    const curY = fromPos.y + (toNode.y - fromPos.y) * ratio

    // 每一个 tick 推进恰好一个时辰
    const nextShichenIdx = (s.shichenIdx + 1) % 12

    let nextDayCount = s.dayCount
    let nextFood = s.food
    let nextSilver = s.silver
    let nextCombatExp = s.combatExp
    let nextHp = s.hp
    let nextMp = s.mp
    let nextBaseStats = s.baseStats
    let nextArtExps = s.artExps
    let nextArtMilestoneFlags = s.artMilestoneFlags
    let nextRes = s.res
    let nextSkills = s.skills
    let nextSectState = s.sectState
    let nextNpcFavor = s.npcFavor
    let overdueSpyAmbush: NodeNpc | null = null
    let nextLogs = [...s.logs]
    let nextMasters = s.roamingMasters

    let crossedDayBoundary = false
    if (dayAccumulator >= 1.0) {
      dayAccumulator -= 1.0
      nextDayCount += 1
      crossedDayBoundary = true
      if (nextFood > 0) {
        nextFood -= 1
        const recTravel = applyDailyVitalityRecovery({
          hp: nextHp,
          maxHp: s.maxHp,
          mp: nextMp,
          maxMp: s.maxMp,
          daysAdded: 1,
          factor: 0.25,
        })
        nextHp = recTravel.hp
        nextMp = recTravel.mp
      } else if (nextSilver >= DAILY_INN_LODGING_COST) {
        nextSilver -= DAILY_INN_LODGING_COST
        const recTravel = applyDailyVitalityRecovery({
          hp: nextHp,
          maxHp: s.maxHp,
          mp: nextMp,
          maxMp: s.maxMp,
          daysAdded: 1,
          factor: 0.25,
        })
        nextHp = recTravel.hp
        nextMp = recTravel.mp
      } else {
        nextHp = Math.max(1, Math.round(nextHp * 0.9))
        nextMp = Math.max(0, Math.round(nextMp * 0.9))
      }

      if (Math.random() < 0.16) {
        const ev = ROAD_EVENTS[Math.floor(Math.random() * ROAD_EVENTS.length)]
        if (ev) {
          const clonedBase = cloneHeroBaseStats(s.baseStats)
          const draft = {
            hp: nextHp,
            maxHp: s.maxHp,
            mp: nextMp,
            maxMp: s.maxMp,
            combatExp: nextCombatExp,
            silver: nextSilver,
            baseStats: clonedBase,
          }
          ev.apply(draft)
          const syncedArts = syncArtLevelsToExpsAndMilestones({
            baseStats: clonedBase,
            artExps: nextArtExps,
            artMilestoneFlags: nextArtMilestoneFlags,
          })
          nextArtExps = syncedArts.artExps
          nextArtMilestoneFlags = syncedArts.artMilestoneFlags
          const derived = deriveHeroEffectiveStats(
            clonedBase,
            s.equipped,
            s.equippedArts,
            s.learnedArts,
            { heavyInjury: Boolean(s.questState.flags.taihang_heavy_injury) },
          )
          nextBaseStats = clonedBase
          nextHp = Math.min(derived.maxHp, draft.hp)
          nextMp = Math.min(derived.maxMp, draft.mp)
          nextCombatExp = draft.combatExp
          nextSilver = draft.silver
          nextRes = derived.res
          nextSkills = derived.skills
          const milestoneNote =
            syncedArts.milestoneNotes.length > 0
              ? `（${syncedArts.milestoneNotes.join(' · ')}）`
              : ''
          nextLogs.unshift(
            createLogEntry(nextDayCount, ev.tag, `${ev.msg}${milestoneNote}`, true, nextShichenIdx),
          )
        }
      }

      if ((nextDayCount - 1) % 30 === 0) {
        nextMasters = s.roamingMasters.map((m) => {
          const neighbors = (ADJACENCY_MAP[m.nodeId] ?? []).filter((edge) =>
            isRegionUnlockedByInventory(edge.to, s.inventory),
          )
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
              nextShichenIdx,
            ),
          )
        }
      }

      const dayHook = applyDayProgressionSectHooks({
        nextDayCount,
        shichenIdx: nextShichenIdx,
        silver: nextSilver,
        sectState: nextSectState,
        logs: nextLogs,
        npcFavor: nextNpcFavor,
      })
      nextSilver = dayHook.silver
      nextSectState = dayHook.sectState
      nextLogs = dayHook.logs
      nextNpcFavor = dayHook.npcFavor
      overdueSpyAmbush = dayHook.overdueSpyAmbush
    }

    if (ratio >= 1) {
      const arrivedNodeId = seg.to
      const blacklisted =
        nextSectState.songCourtBlacklisted || Boolean(s.questState.flags.song_court_blacklisted)
      if (arrivedNodeId === 'bianliang' && blacklisted) {
        const ambushMsg =
          '少侠身负绿林劫官海捕文书踏入东京【开封府】界，城门前红衣剑影一闪——御前四品带刀护卫【展昭】按巨阙宝剑拦路喝道：「朝廷钦犯休走！随展某回开封府伏法！」'
        nextLogs.unshift(
          createLogEntry(nextDayCount, '开封缉捕', ambushMsg, true, nextShichenIdx),
        )
        set({
          dayCount: nextDayCount,
          shichenIdx: nextShichenIdx,
          food: nextFood,
          silver: nextSilver,
          combatExp: nextCombatExp,
          sectState: nextSectState,
          npcFavor: nextNpcFavor,
          baseStats: nextBaseStats,
          artExps: nextArtExps,
          artMilestoneFlags: nextArtMilestoneFlags,
          hp: nextHp,
          mp: nextMp,
          res: nextRes,
          skills: nextSkills,
          roamingMasters: nextMasters,
          traveling: null,
          campPos: null,
          currentNodeId: 'bianliang',
          selectedNodeId: 'bianliang',
          activeRegionId: 'bianliang',
          activeBuildingInteriorId: null,
          selectedBuildingId: null,
          selectedSpotId: null,
          viewMode: 'region',
          regionPan: { x: 0, y: 0, scale: 1 },
          logs: nextLogs.slice(0, 60),
        })
        if (crossedDayBoundary) get().checkExpiredQuestDeadlines()
        get().fireLocationTriggersForCurrentSpot({
          regionId: 'bianliang',
          buildingId: null,
          spotId: null,
          isPassThrough: true,
        })
        if (!get().activeStoryScene && !get().activeCombat && !get().gameOver) {
          get().startNpcCombat(buildZhanZhaoArrestNodeNpc(), 'duel', 'zhan_zhao_arrest', true)
        }
        return
      }

      const nextSegIdx = tr.segIdx + 1
      if (nextSegIdx >= tr.route.segments.length) {
        const destName = NODE_MAP[arrivedNodeId]?.name ?? arrivedNodeId
        nextLogs.unshift(
          createLogEntry(
            nextDayCount,
            '抵达入图',
            `千里风霜，顺利抵达【${destName}】！主视口已按需展开【${destName}】半3D全景舆图。`,
            true,
            nextShichenIdx,
          ),
        )
        set({
          dayCount: nextDayCount,
          shichenIdx: nextShichenIdx,
          food: nextFood,
          silver: nextSilver,
          combatExp: nextCombatExp,
          sectState: nextSectState,
          npcFavor: nextNpcFavor,
          baseStats: nextBaseStats,
          artExps: nextArtExps,
          artMilestoneFlags: nextArtMilestoneFlags,
          hp: nextHp,
          mp: nextMp,
          res: nextRes,
          skills: nextSkills,
          roamingMasters: nextMasters,
          traveling: null,
          campPos: null,
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
        if (crossedDayBoundary) get().checkExpiredQuestDeadlines()
        if (overdueSpyAmbush) {
          get().startNpcCombat(overdueSpyAmbush, 'duel', 'liao_spy_duel', true)
        } else {
          get().fireLocationTriggersForCurrentSpot({
            regionId: arrivedNodeId,
            buildingId: null,
            spotId: null,
            isPassThrough: false,
          })
          if (!get().activeCombat && !get().gameOver) {
            void get().saveToSlot('autosave', `策马抵达${destName}`, true)
          }
        }
        return
      }

      nextLogs.unshift(
        createLogEntry(
          nextDayCount,
          '途经',
          `途经要冲【${NODE_MAP[arrivedNodeId]?.name ?? arrivedNodeId}】，换马饮水后继续前行。`,
          false,
          nextShichenIdx,
        ),
      )
      segProgressDays = 0
      set({
        dayCount: nextDayCount,
        shichenIdx: nextShichenIdx,
        food: nextFood,
        silver: nextSilver,
        combatExp: nextCombatExp,
        sectState: nextSectState,
        npcFavor: nextNpcFavor,
        baseStats: nextBaseStats,
        artExps: nextArtExps,
        artMilestoneFlags: nextArtMilestoneFlags,
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
      if (crossedDayBoundary) get().checkExpiredQuestDeadlines()
      if (overdueSpyAmbush) {
        get().campStop()
        get().startNpcCombat(overdueSpyAmbush, 'duel', 'liao_spy_duel', true)
        return
      }
      const passTriggered = get().fireLocationTriggersForCurrentSpot({
        regionId: arrivedNodeId,
        buildingId: null,
        spotId: null,
        isPassThrough: true,
      })
      if (passTriggered && (get().activeCombat || get().activeStoryScene || get().gameOver)) {
        set({
          traveling: null,
          campPos: null,
          activeRegionId: arrivedNodeId,
          selectedNodeId: arrivedNodeId,
          viewMode: 'region',
        })
      }
      return
    }

    set({
      dayCount: nextDayCount,
      shichenIdx: nextShichenIdx,
      food: nextFood,
      silver: nextSilver,
      combatExp: nextCombatExp,
      sectState: nextSectState,
      npcFavor: nextNpcFavor,
      baseStats: nextBaseStats,
      artExps: nextArtExps,
      artMilestoneFlags: nextArtMilestoneFlags,
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
    if (crossedDayBoundary) get().checkExpiredQuestDeadlines()
    if (overdueSpyAmbush) {
      get().campStop()
      get().startNpcCombat(overdueSpyAmbush, 'duel', 'liao_spy_duel', true)
      return
    }
    if (crossedDayBoundary) {
      const stAfter = get()
      const inNorthChina =
        NORTH_CHINA_REGION_IDS.has(seg.from) || NORTH_CHINA_REGION_IDS.has(seg.to)
      const isKaifengLv3Plus =
        stAfter.sectState.sectId === 'SECT-17' && stAfter.sectState.rank >= 3
      if (
        inNorthChina &&
        isKaifengLv3Plus &&
        !stAfter.activeStoryScene &&
        !stAfter.activeCombat &&
        !stAfter.gameOver
      ) {
        const banditProg = stAfter.questState.activeQuests[TAIHANG_BANDIT_QUEST_ID]
        const banditDone = stAfter.questState.completedQuests[TAIHANG_BANDIT_QUEST_ID]
        if (banditProg?.stepId === 'ambush_ready') {
          get().campStop()
          get().runQuestEffects([{ type: 'openScene', scene: TAIHANG_LEADERS_AMBUSH_SCENE }], null)
        } else if (!banditProg && !banditDone && Math.random() < 0.01) {
          get().campStop()
          get().runQuestEffects([{ type: 'openScene', scene: TAIHANG_BANDIT_ENCOUNTER_SCENE }], null)
        }
      }
    }
  },

  campStop: () => {
    const s = get()
    if (!s.traveling) return
    const curPos = s.traveling.playerPos
    const seg = s.traveling.route.segments[s.traveling.segIdx]
    if (!seg) return

    const r = Math.min(1, Math.max(0, s.traveling.segProgressDays / seg.days))
    let camp: WildernessCamp
    if (seg.campEdge) {
      const { u, v, distU, distV, terrain } = seg.campEdge
      if (seg.to === v) {
        camp = {
          x: curPos.x,
          y: curPos.y,
          u,
          v,
          distU: distU + distV * r,
          distV: distV * (1 - r),
          terrain,
        }
      } else {
        camp = {
          x: curPos.x,
          y: curPos.y,
          u,
          v,
          distU: distU * (1 - r),
          distV: distV + distU * r,
          terrain,
        }
      }
    } else {
      camp = {
        x: curPos.x,
        y: curPos.y,
        u: seg.from,
        v: seg.to,
        distU: seg.dist * r,
        distV: seg.dist * (1 - r),
        terrain: seg.terrain,
      }
    }

    const fromName = NODE_MAP[camp.u]?.name ?? camp.u
    const toName = NODE_MAP[camp.v]?.name ?? camp.v
    set({
      traveling: null,
      selectedNodeId: null,
      campPos: camp,
      logs: [
        createLogEntry(
          s.dayCount,
          '原地露营',
          `少侠收缰驻马，于【${fromName}】至【${toName}】旷野中途原地安营扎寨（距${fromName} ${Math.round(camp.distU)} 里 · 距${toName} ${Math.round(camp.distV)} 里，可就地开启野外扎营闭关）。`,
          false,
          s.shichenIdx,
        ),
        ...s.logs,
      ].slice(0, 60),
    })
  },

  navigateToNpcLeafInCurrentRegion: (npcId) => {
    const s = get()
    const npc = NPC_DB_MAP[npcId]
    if (!npc) return
    if (npc.factionId === 'SECT-18' && Boolean(s.questState.flags.taihang_bandits_eradicated)) {
      set({
        actionFeedback: {
          text: '太行/京东绿林盟贼巢已被大宋禁军犁庭扫穴，群匪尽数伏法，已无此人踪迹。',
          tone: 'warn',
        },
      })
      return
    }
    if (s.currentNodeId !== npc.regionId || s.campPos || s.traveling) return

    const bRecord = BUILDING_DB_MAP[npc.assignedBuildingId]
    if (!bRecord) return

    const lockMeta = getBuildingLockMeta(bRecord.id, s.questState.flags)
    if (lockMeta) {
      set({
        actionFeedback: {
          text: `🔒 ${lockMeta.lockedReason}`,
          tone: 'warn',
        },
      })
      return
    }

    if (npc.assignedSpotId && bRecord.interior) {
      set({
        menuOpen: false,
        compendiumOpen: false,
        saveNotice: null,
        tooltip: null,
        viewMode: 'building',
        activeRegionId: npc.regionId,
        activeBuildingInteriorId: bRecord.id,
        selectedBuildingId: null,
        selectedSpotId: npc.assignedSpotId,
        regionPan: { x: 0, y: 0, scale: 1 },
        actionFeedback: {
          text: `已循名帖步入【${npc.fullLocationLabel}】，可与 ${npc.name} 交互。`,
          tone: 'success',
        },
      })
    } else if (bRecord.interior) {
      set({
        menuOpen: false,
        compendiumOpen: false,
        saveNotice: null,
        tooltip: null,
        viewMode: 'building',
        activeRegionId: npc.regionId,
        activeBuildingInteriorId: bRecord.id,
        selectedBuildingId: bRecord.id,
        selectedSpotId: null,
        regionPan: { x: 0, y: 0, scale: 1 },
        actionFeedback: {
          text: `已循名帖步入【${npc.fullLocationLabel}】大堂，可与 ${npc.name} 交互。`,
          tone: 'success',
        },
      })
    } else {
      set({
        menuOpen: false,
        compendiumOpen: false,
        saveNotice: null,
        tooltip: null,
        viewMode: 'region',
        activeRegionId: npc.regionId,
        activeBuildingInteriorId: null,
        selectedSpotId: null,
        selectedBuildingId: bRecord.id,
        regionPan: { x: 0, y: 0, scale: 1 },
        actionFeedback: {
          text: `已循名帖前往【${npc.fullLocationLabel}】，可与 ${npc.name} 交互。`,
          tone: 'success',
        },
      })
    }
  },
})
