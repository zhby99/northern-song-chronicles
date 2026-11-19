import { buildCampFromTraveling } from '../../engine/world/travelCamp'
import {
  getYamenBountyPostings,
  isYamenBountyBoardBuilding,
  isYamenBountyExpired,
} from '../../engine/world/yamenBounty'
import { isNpcDead } from '../../engine/social/npcDeath'
import type { StoreSlice } from '../storeTypes'
import { gameRng } from '../../engine/combat/rng'
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
} from '../../types/game'
import {
  NORTH_CHINA_REGION_IDS,
  TAIHANG_BANDIT_QUEST_ID,
} from '../../engine/shared/constants'
import {
  buildEscortHighwaymanNpc,
  computeHighwaymanPersuadeChance,
  getAvailableEscortContracts,
  getRegionLodgingInfo,
  isEscortVenueBuilding,
} from '../../engine/economy'
import {
  cloneHeroBaseStats,
  deriveHeroEffectiveStats,
  isPlayerInFreeLodgingRegion,
} from '../../engine/stats/heroStats'
import { syncArtLevelsToExpsAndMilestones } from '../../engine/stats/artsProgression'
import {
  clampMapPan,
  findBestRoute,
  getBuildingLockMeta,
  getSpotLockMeta,
  getRegionAllBuildings,
  getRegionViewBoxSize,
  NODE_MAP,
  REGIONAL_CONFIGS,
} from '../../engine/world/mapMath'
import { buildZhanZhaoArrestNodeNpc } from '../../engine/sect'
import {
  LABEL_KEYS,
  ROAD_EVENTS,
  createLogEntry,
  applyDailyVitalityRecovery,
  applyDayProgressionSectHooks,
  rotateMonthlyRoamingMasters,
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
  | 'acceptEscortContract'
  | 'abandonEscortContract'
  | 'acceptYamenBounty'
  | 'abandonYamenBounty'
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
    if (spotId) {
      const spotLock = getSpotLockMeta(spotId, get().questState.flags)
      if (spotLock) {
        set({
          actionFeedback: {
            text: `🔒 ${spotLock.lockedReason}`,
            tone: 'warn',
          },
        })
        return
      }
    }
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
      const isDamingMapTheftOnly =
        Boolean(s.questState.flags.dm_stole_hebei_defense_map) &&
        !s.questState.flags.toumingzhuang_completed
      const ambushText = isDamingMapTheftOnly
        ? '少侠身负夜盗北京留守行宫《河北防辽舆图》之海捕黑名单，甫一踏入东京开封府，御前四品带刀护卫「南侠」展昭已执剑拦路，不死不休！'
        : '少侠身负劫掠大宋朝廷官员之海捕黑名单，甫一踏入东京开封府，御前四品带刀护卫「南侠」展昭已执剑拦路，不死不休！'
      logs = [
        createLogEntry(
          s.dayCount,
          '开封缉捕',
          ambushText,
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

    if (
      isKaifengAmbush &&
      !get().activeStoryScene &&
      !get().pendingSceneLoad &&
      !get().activeCombat &&
      !get().gameOver
    ) {
      get().startNpcCombat(buildZhanZhaoArrestNodeNpc(), 'duel', 'zhan_zhao_arrest', true)
      return
    }

    if (
      logSwitch &&
      !get().activeStoryScene &&
      !get().pendingSceneLoad &&
      !get().activeCombat &&
      !get().gameOver
    ) {
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
      get().autosaveIfIdle(`步入${bRecord.name}`)
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

  setWorldPan: (pan) => set({ worldPan: clampMapPan(pan, 1600, 1000, 0.56, 3.4) }),

  zoomWorldBy: (factor, cx = 800, cy = 500) =>
    set((s) => {
      const nextScale = Math.min(3.4, Math.max(0.56, s.worldPan.scale * factor))
      const ratio = nextScale / s.worldPan.scale
      return {
        worldPan: clampMapPan(
          {
            x: cx - (cx - s.worldPan.x) * ratio,
            y: cy - (cy - s.worldPan.y) * ratio,
            scale: nextScale,
          },
          1600,
          1000,
          0.56,
          3.4,
        ),
      }
    }),

  focusZhongyuan: () => set({ worldPan: { x: -340, y: -165, scale: 1.48 } }),
  focusMacroRegimes: () => set({ worldPan: { x: 185, y: 112, scale: 0.74 } }),
  resetWorldView: () => set({ worldPan: { x: 0, y: 0, scale: 1 } }),

  setRegionPan: (pan) =>
    set((s) => {
      const [vw, vh] = getRegionViewBoxSize(s.viewMode, s.activeRegionId)
      return { regionPan: clampMapPan(pan, vw, vh, 0.62, 4.2) }
    }),

  zoomRegionBy: (factor, cx = null, cy = null) =>
    set((s) => {
      const [vw, vh] = getRegionViewBoxSize(s.viewMode, s.activeRegionId)
      const pivotX = cx !== null ? cx : vw / 2
      const pivotY = cy !== null ? cy : vh / 2
      const nextScale = Math.min(4.2, Math.max(0.62, s.regionPan.scale * factor))
      const ratio = nextScale / s.regionPan.scale
      return {
        regionPan: clampMapPan(
          {
            x: pivotX - (pivotX - s.regionPan.x) * ratio,
            y: pivotY - (pivotY - s.regionPan.y) * ratio,
            scale: nextScale,
          },
          vw,
          vh,
          0.62,
          4.2,
        ),
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
          const spotLock = target.spotId
            ? getSpotLockMeta(target.spotId, s.questState.flags)
            : null
          const resolvedSpotId = spotLock ? null : (target.spotId ?? null)
          set({
            menuOpen: false,
            compendiumOpen: false,
            tooltip: null,
            viewMode: 'building',
            activeRegionId: target.regionId,
            activeBuildingInteriorId: bRec.id,
            selectedBuildingId: resolvedSpotId ? null : bRec.id,
            selectedSpotId: resolvedSpotId,
            regionPan: { x: 0, y: 0, scale: 1 },
            actionFeedback: spotLock
              ? {
                  text: `🔒 ${spotLock.lockedReason}`,
                  tone: 'warn',
                }
              : {
                  text: `已循任务卷宗步入【${target.customLabel ?? bRec.name}】！`,
                  tone: 'success',
                },
          })
          // 与正常步入建筑一致：先经过正堂（建筑级触发器），若未弹出模态剧情/战斗/异步剧本再落到目标子景点
          get().fireLocationTriggersForCurrentSpot({
            regionId: target.regionId,
            buildingId: bRec.id,
            spotId: null,
          })
          const afterHall = get()
          if (
            resolvedSpotId &&
            !afterHall.activeStoryScene &&
            !afterHall.pendingSceneLoad &&
            !afterHall.activeCombat &&
            !afterHall.gameOver
          ) {
            get().fireLocationTriggersForCurrentSpot({
              regionId: target.regionId,
              buildingId: bRec.id,
              spotId: resolvedSpotId,
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
        // 除写入日志外直接在检视卡上提示，避免点击「策马出发」毫无反应
        actionFeedback: {
          text: '行囊粮草已尽，无法远征！请先在城中市集或客栈补给干粮。',
          tone: 'warn',
        },
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
    let nextRenown = s.renown
    let nextHp = s.hp
    let nextMp = s.mp
    let nextBaseStats = s.baseStats
    let nextArtExps = s.artExps
    let nextArtMilestoneFlags = s.artMilestoneFlags
    let nextRes = s.res
    let nextSkills = s.skills
    let nextSectState = s.sectState
    let nextNpcFavor = s.npcFavor
    let nextEscortContract = s.activeEscortContract
    let escortFeedback: { text: string; tone: 'success' | 'warn' | 'talk' } | null = null
    let overdueSpyAmbush: NodeNpc | null = null
    let nextLogs = [...s.logs]
    let nextMasters = s.roamingMasters

    // 跨日以子时为界：亥时（11）走入子时（0）即进入次日，与出发时刻、途中扎营无关
    // （旧逻辑按出发后累计满 12 个时辰才跨日，导致日历倒流，且可靠「走 11 时辰 → 扎营 → 再出发」永不跨日）
    let crossedDayBoundary = false
    if (nextShichenIdx === 0) {
      dayAccumulator = 0
      nextDayCount += 1
      crossedDayBoundary = true
      const fallbackDailySilver = getRegionLodgingInfo(s.currentNodeId).dailyCost
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
      } else if (nextSilver >= fallbackDailySilver) {
        nextSilver -= fallbackDailySilver
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
        nextFood = 0
        nextHp = Math.max(1, Math.round(nextHp * 0.9))
        nextMp = Math.max(0, Math.round(nextMp * 0.9))
      }

      if (gameRng() < 0.16) {
        const ev = ROAD_EVENTS[Math.floor(gameRng() * ROAD_EVENTS.length)]
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

      const rot = rotateMonthlyRoamingMasters({
        prevDayCount: s.dayCount,
        nextDayCount,
        shichenIdx: nextShichenIdx,
        roamingMasters: nextMasters,
        logs: nextLogs,
        emitRumorLog: true,
        deadNpcIds: s.deadNpcIds,
        canEnterNode: (regionId) => isRegionUnlockedByInventory(regionId, s.inventory),
      })
      nextMasters = rot.roamingMasters
      nextLogs = rot.logs

      const dayHook = applyDayProgressionSectHooks({
        nextDayCount,
        shichenIdx: nextShichenIdx,
        silver: nextSilver,
        sectState: nextSectState,
        logs: nextLogs,
        npcFavor: nextNpcFavor,
        celunSkill: nextSkills['策论'] ?? 0,
      })
      nextSilver = dayHook.silver
      nextSectState = dayHook.sectState
      nextLogs = dayHook.logs
      nextNpcFavor = dayHook.npcFavor
      overdueSpyAmbush = dayHook.overdueSpyAmbush
    }

    if (ratio >= 1) {
      const arrivedNodeId = seg.to
      if (nextEscortContract && nextEscortContract.destRegionId === arrivedNodeId) {
        const doneContract = nextEscortContract
        nextSilver += doneContract.rewardSilver
        nextCombatExp += 15
        nextRenown += 2
        const doneMsg = `镖旗招展，【${doneContract.cargoName}】毫发无损送抵【${doneContract.destName}】分号！镖头验封交割，奉上镖酬 +${doneContract.rewardSilver} 两、实战阅历 +15、江湖声望 +2！`
        nextLogs.unshift(
          createLogEntry(nextDayCount, '交镖结银', doneMsg, true, nextShichenIdx),
        )
        escortFeedback = { text: doneMsg, tone: 'success' }
        nextEscortContract = null
      }

      const blacklisted =
        nextSectState.songCourtBlacklisted || Boolean(s.questState.flags.song_court_blacklisted)
      if (arrivedNodeId === 'bianliang' && blacklisted) {
        const isDamingMapTheftOnly =
          Boolean(s.questState.flags.dm_stole_hebei_defense_map) &&
          !s.questState.flags.toumingzhuang_completed
        const ambushMsg = isDamingMapTheftOnly
          ? '少侠身负夜盗北京留守行宫《河北防辽舆图》海捕文书踏入东京【开封府】界，城门前红衣剑影一闪——御前四品带刀护卫【展昭】按巨阙宝剑拦路喝道：「盗取边防机密钦犯休走！随展某回开封府伏法！」'
          : '少侠身负绿林劫官海捕文书踏入东京【开封府】界，城门前红衣剑影一闪——御前四品带刀护卫【展昭】按巨阙宝剑拦路喝道：「朝廷钦犯休走！随展某回开封府伏法！」'
        nextLogs.unshift(
          createLogEntry(nextDayCount, '开封缉捕', ambushMsg, true, nextShichenIdx),
        )
        set({
          dayCount: nextDayCount,
          shichenIdx: nextShichenIdx,
          food: nextFood,
          silver: nextSilver,
          combatExp: nextCombatExp,
          renown: nextRenown,
          sectState: nextSectState,
          npcFavor: nextNpcFavor,
          activeEscortContract: nextEscortContract,
          ...(escortFeedback ? { actionFeedback: escortFeedback } : {}),
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
          cityStayShichens: 0,
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
        if (
          !get().activeStoryScene &&
          !get().pendingSceneLoad &&
          !get().activeCombat &&
          !get().gameOver
        ) {
          get().startNpcCombat(buildZhanZhaoArrestNodeNpc(), 'duel', 'zhan_zhao_arrest', true)
        }
        return
      }

      const nextSegIdx = tr.segIdx + 1
      if (nextSegIdx >= tr.route.segments.length) {
        const destName = NODE_MAP[arrivedNodeId]?.name ?? arrivedNodeId
        const isFreeLodging = isPlayerInFreeLodgingRegion(
          arrivedNodeId,
          null,
          nextSectState.sectId,
          s.birthplaceId,
        )
        const lodgingInfo = getRegionLodgingInfo(arrivedNodeId)
        const arrivalLodgingFee = isFreeLodging ? 0 : Math.min(nextSilver, lodgingInfo.dailyCost)
        nextSilver -= arrivalLodgingFee
        const arrivalLodgingNote = isFreeLodging
          ? ''
          : arrivalLodgingFee > 0
            ? `（进城先缴首日【${lodgingInfo.tierLabel}】宿费 ${arrivalLodgingFee} 两纹银，之后每满 12 时辰续算）`
            : `（进城宿费需 ${lodgingInfo.dailyCost} 两，随身银两不足暂赊）`
        nextLogs.unshift(
          createLogEntry(
            nextDayCount,
            '抵达入图',
            `千里风霜，顺利抵达【${destName}】！${arrivalLodgingNote}主视口已按需展开【${destName}】半3D全景舆图。`,
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
          renown: nextRenown,
          sectState: nextSectState,
          npcFavor: nextNpcFavor,
          activeEscortContract: nextEscortContract,
          ...(escortFeedback ? { actionFeedback: escortFeedback } : {}),
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
          cityStayShichens: 0,
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
          if (!get().activeCombat && !get().pendingSceneLoad && !get().gameOver) {
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
        renown: nextRenown,
        sectState: nextSectState,
        npcFavor: nextNpcFavor,
        activeEscortContract: nextEscortContract,
        ...(escortFeedback ? { actionFeedback: escortFeedback } : {}),
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
      if (
        passTriggered &&
        (get().activeCombat ||
          get().activeStoryScene ||
          get().pendingSceneLoad ||
          get().gameOver)
      ) {
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

    // 走镖半途绿林响马拦劫检定（联动【辩才】劝退率 = 辩才 / 150）
    const midSegIdx = Math.floor(tr.route.segments.length / 2)
    if (
      nextEscortContract &&
      !nextEscortContract.ambushResolved &&
      tr.segIdx >= midSegIdx &&
      ratio >= 0.5 &&
      !overdueSpyAmbush
    ) {
      const resolvedContract = { ...nextEscortContract, ambushResolved: true }
      nextEscortContract = resolvedContract
      const eloquence = nextSkills['辩才'] ?? 0
      const persuadeChance = computeHighwaymanPersuadeChance(eloquence)

      if (gameRng() < persuadeChance) {
        nextRenown += 1
        const persuadeMsg = `行至险隘，一伙绿林响马呼哨拦路欲劫【${resolvedContract.cargoName}】！少侠按剑上前，凭【辩才 ${eloquence}】（劝退率 ${Math.round(persuadeChance * 100)}%）晓以利害、陈说黑白，匪首冷汗涔涔拱手让道，不战而退（江湖声望 +1）！`
        nextLogs.unshift(
          createLogEntry(nextDayCount, '舌退群寇', persuadeMsg, true, nextShichenIdx),
        )
        escortFeedback = { text: persuadeMsg, tone: 'talk' }
      } else {
        const ambushMsg = `行至半途险道，林中梆子急响，一彪凶悍响马横刀拦截【${resolvedContract.cargoName}】！言辞喝阻无效，唯有一战护镖！`
        nextLogs.unshift(
          createLogEntry(nextDayCount, '绿林劫镖', ambushMsg, true, nextShichenIdx),
        )
        set({
          dayCount: nextDayCount,
          shichenIdx: nextShichenIdx,
          food: nextFood,
          silver: nextSilver,
          combatExp: nextCombatExp,
          renown: nextRenown,
          sectState: nextSectState,
          npcFavor: nextNpcFavor,
          activeEscortContract: nextEscortContract,
          actionFeedback: { text: ambushMsg, tone: 'warn' },
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
        get().campStop()
        get().startNpcCombat(
          buildEscortHighwaymanNpc(resolvedContract),
          'spar',
          'escort_ambush',
          true,
        )
        return
      }
    }

    set({
      dayCount: nextDayCount,
      shichenIdx: nextShichenIdx,
      food: nextFood,
      silver: nextSilver,
      combatExp: nextCombatExp,
      renown: nextRenown,
      sectState: nextSectState,
      npcFavor: nextNpcFavor,
      activeEscortContract: nextEscortContract,
      ...(escortFeedback ? { actionFeedback: escortFeedback } : {}),
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
      const canContinueTaihangBandit =
        isKaifengLv3Plus || stAfter.sectState.sectId === 'SECT-33'
      if (
        inNorthChina &&
        canContinueTaihangBandit &&
        !stAfter.activeStoryScene &&
        !stAfter.activeCombat &&
        !stAfter.gameOver
      ) {
        const banditProg = stAfter.questState.activeQuests[TAIHANG_BANDIT_QUEST_ID]
        const banditDone = stAfter.questState.completedQuests[TAIHANG_BANDIT_QUEST_ID]
        if (banditProg?.stepId === 'ambush_ready') {
          get().campStop()
          get().runQuestEffects(
            [
              {
                type: 'openScene',
                sceneId: 'scene_thb_13_canyon_trap',
                questId: TAIHANG_BANDIT_QUEST_ID,
              },
            ],
            null,
          )
        } else if (isKaifengLv3Plus && !banditProg && !banditDone && gameRng() < 0.1) {
          get().campStop()
          get().runQuestEffects(
            [
              {
                type: 'openScene',
                sceneId: 'scene_thb_01_road_omen',
                questId: TAIHANG_BANDIT_QUEST_ID,
              },
            ],
            null,
          )
        }
      }
    }
  },

  campStop: () => {
    const s = get()
    if (!s.traveling) return
    const camp = buildCampFromTraveling(s.traveling)
    if (!camp) return

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

  acceptEscortContract: (contractId) => {
    const s = get()
    if (s.campPos || s.traveling || s.cultivationSession || s.activeCombat) {
      set({
        actionFeedback: {
          text: '少侠正在行路、露营或闭关途中，无法立约接镖。',
          tone: 'warn',
        },
      })
      return
    }
    if (s.activeEscortContract) {
      set({
        actionFeedback: {
          text: `身上已有护送至【${s.activeEscortContract.destName}】的镖单，请先送达交割或弃镖。`,
          tone: 'warn',
        },
      })
      return
    }
    const bId = s.activeBuildingInteriorId ?? s.selectedBuildingId
    const bRec = bId ? BUILDING_DB_MAP[bId] : null
    if (!bRec || s.currentNodeId !== s.activeRegionId || !isEscortVenueBuilding(bRec.id, bRec.name)) {
      set({
        actionFeedback: {
          text: '须亲临本地镖局、客栈或馆驿方可揭榜接镖。',
          tone: 'warn',
        },
      })
      return
    }

    const contracts = getAvailableEscortContracts({
      originRegionId: s.currentNodeId,
      dayCount: s.dayCount,
      speedParams: {
        mountKey: s.mountKey,
        qinggongBonus: s.qinggongBonus,
        ridingSkill: s.ridingSkill,
        agility: s.agility,
      },
      inventory: s.inventory,
    })
    const picked = contracts.find((c) => c.id === contractId)
    if (!picked) {
      set({
        actionFeedback: {
          text: '该趟走镖红货榜文已逾时或不可达。',
          tone: 'warn',
        },
      })
      return
    }

    const msg = `少侠于【${bRec.name}】按印揭下红货镖单：护送【${picked.cargoName}】前往【${picked.destName}】（全程 ${picked.totalLi} 里 · ${picked.dangerLabel} · 约定镖酬 ${picked.rewardSilver} 两）！可切至天下舆图启程押运。`
    set({
      activeEscortContract: picked,
      selectedNodeId: picked.destRegionId,
      actionFeedback: { text: msg, tone: 'success' },
      logs: [createLogEntry(s.dayCount, '揭榜走镖', msg, true, s.shichenIdx), ...s.logs].slice(
        0,
        60,
      ),
    })
  },

  abandonEscortContract: () => {
    const s = get()
    const cur = s.activeEscortContract
    if (!cur) return
    const nextRenown = Math.max(0, s.renown - 2)
    const msg = `少侠半途辞退【${cur.cargoName}】镖单，镖局另派趟子手接管（失信折损江湖声望 -2）。`
    set({
      activeEscortContract: null,
      renown: nextRenown,
      actionFeedback: { text: msg, tone: 'warn' },
      logs: [createLogEntry(s.dayCount, '辞退镖单', msg, false, s.shichenIdx), ...s.logs].slice(
        0,
        60,
      ),
    })
  },

  acceptYamenBounty: (postingId) => {
    const s = get()
    if (s.traveling || s.campPos || s.cultivationSession) {
      set({ actionFeedback: { text: '少侠正在行路、露营或闭关途中，无法揭榜。', tone: 'warn' } })
      return
    }
    const cur = s.activeYamenBounty
    if (cur && !isYamenBountyExpired(cur, s.dayCount)) {
      set({
        actionFeedback: {
          text: `身上已揭有缉拿【${cur.targetName}】的悬赏榜文，请先拿人归案或撕榜作罢。`,
          tone: 'warn',
        },
      })
      return
    }
    const bId = s.activeBuildingInteriorId ?? s.selectedBuildingId
    if (s.currentNodeId !== s.activeRegionId || !isYamenBountyBoardBuilding(bId)) {
      set({ actionFeedback: { text: '须亲临州府衙门方可揭榜缉凶。', tone: 'warn' } })
      return
    }
    const posting = getYamenBountyPostings({
      issueRegionId: s.currentNodeId,
      dayCount: s.dayCount,
      doneIds: s.yamenBountyDoneIds,
    }).find((p) => p.id === postingId)
    if (!posting) {
      set({ actionFeedback: { text: '该张悬赏榜文已被揭走或逾期。', tone: 'warn' } })
      return
    }
    const msg = `少侠于【${posting.issueRegionName}】衙门揭下${posting.gradeLabel}榜文：缉拿【${posting.targetName}】（${posting.targetTitle} · ${posting.realm}），据报潜匿【${posting.regionName} · ${posting.buildingName}】，限第 ${posting.deadlineDay} 日前拿人归案（赏银 ${posting.rewardSilver} 两 · 战斗经验 +${posting.rewardCombatExp} · 侠义 +${posting.rewardChivalry}）。`
    set({
      activeYamenBounty: posting,
      selectedNodeId: posting.regionId,
      actionFeedback: { text: msg, tone: 'success' },
      logs: [createLogEntry(s.dayCount, '揭榜缉凶', msg, true, s.shichenIdx), ...s.logs].slice(0, 60),
    })
  },

  abandonYamenBounty: () => {
    const s = get()
    const cur = s.activeYamenBounty
    if (!cur) return
    const expired = isYamenBountyExpired(cur, s.dayCount)
    const nextRenown = expired ? s.renown : Math.max(0, s.renown - 1)
    const msg = expired
      ? `缉拿【${cur.targetName}】的悬赏榜文已然逾期作废。`
      : `少侠撕去缉拿【${cur.targetName}】的悬赏榜文，交还${cur.issueRegionName}衙门（失信折损江湖声望 -1）。`
    set({
      activeYamenBounty: null,
      renown: nextRenown,
      actionFeedback: { text: msg, tone: 'warn' },
      logs: [createLogEntry(s.dayCount, '撕榜作罢', msg, false, s.shichenIdx), ...s.logs].slice(0, 60),
    })
  },

  navigateToNpcLeafInCurrentRegion: (npcId) => {
    const s = get()
    const npc = NPC_DB_MAP[npcId]
    if (!npc) return
    if (isNpcDead(s.deadNpcIds, npc.id)) {
      set({
        actionFeedback: {
          text:
            npc.factionId === 'SECT-18'
              ? '太行/京东绿林盟贼巢已被大宋禁军犁庭扫穴，群匪尽数伏法，已无此人踪迹。'
              : `【${npc.name}】已然身故，斯人已逝。`,
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

    if (npc.assignedSpotId) {
      const spotLock = getSpotLockMeta(npc.assignedSpotId, s.questState.flags)
      if (spotLock) {
        set({
          actionFeedback: {
            text: `🔒 ${spotLock.lockedReason}`,
            tone: 'warn',
          },
        })
        return
      }
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
      get().fireLocationTriggersForCurrentSpot({
        regionId: npc.regionId,
        buildingId: bRecord.id,
        spotId: null,
      })
      const afterHall = get()
      if (
        !afterHall.activeStoryScene &&
        !afterHall.pendingSceneLoad &&
        !afterHall.activeCombat &&
        !afterHall.gameOver
      ) {
        get().fireLocationTriggersForCurrentSpot({
          regionId: npc.regionId,
          buildingId: bRecord.id,
          spotId: npc.assignedSpotId,
        })
      }
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
      get().fireLocationTriggersForCurrentSpot({
        regionId: npc.regionId,
        buildingId: bRecord.id,
        spotId: null,
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
      get().fireLocationTriggersForCurrentSpot({
        regionId: npc.regionId,
        buildingId: bRecord.id,
        spotId: null,
      })
    }
  },
})
