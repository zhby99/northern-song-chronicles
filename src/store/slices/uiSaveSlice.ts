import type { StoreSlice } from '../storeTypes'
import { BUILDING_DB_MAP } from '../../data/gameDb'
import { cloneQuestRuntimeState } from '../../engine/questEngine'
import { getProtagonistGender } from '../../data/protagonistPresets'
import {
  cloneHeroBaseStats,
  deriveHeroEffectiveStats,
} from '../../engine/stats/heroStats'
import {
  formatSongDate,
  NODE_MAP,
} from '../../engine/world/mapMath'
import {
  CURRENT_SAVE_SCHEMA_VERSION,
  deleteSaveSlot,
  listAllSaveEnvelopes,
  putSaveEnvelope,
} from '../../utils/saveManager'
import { clonePlayerSectState } from '../../engine/sect'
import {
  createLogEntry,
  extractSerializableState,
} from '../storeHelpers'

export type UiSaveKeys =
  | 'clearActionFeedback'
  | 'setTooltip'
  | 'moveTooltip'
  | 'clearFloatingSelection'
  | 'toggleLogDrawer'
  | 'openMenu'
  | 'openCompendium'
  | 'closeCompendium'
  | 'setCompendiumTab'
  | 'openNpcDetailInCompendium'
  | 'closeMenu'
  | 'setMenuTab'
  | 'buildSaveEnvelope'
  | 'refreshSaveSlots'
  | 'saveToSlot'
  | 'loadFromEnvelope'
  | 'removeSaveSlot'
  | 'setSaveNotice'

export const createUiSaveSlice: StoreSlice<UiSaveKeys> = (set, get) => ({
  clearActionFeedback: () => set({ actionFeedback: null }),
  setTooltip: (payload) => set({ tooltip: payload }),
  moveTooltip: (x, y) =>
    set((s) => (s.tooltip ? { tooltip: { ...s.tooltip, x, y } } : s)),

  clearFloatingSelection: () => {
    const s = get()
    if (s.viewMode === 'world') {
      set({ selectedNodeId: null, actionFeedback: null })
    } else if (s.viewMode === 'building') {
      set({ selectedSpotId: null, selectedBuildingId: null, actionFeedback: null })
    } else {
      set({ selectedBuildingId: null, actionFeedback: null })
    }
  },

  toggleLogDrawer: () => set((s) => ({ logDrawerOpen: !s.logDrawerOpen })),

  openMenu: (tab) => {
    set((s) => ({
      menuOpen: true,
      compendiumOpen: false,
      tooltip: null,
      saveNotice: null,
      activeMenuTab: tab ?? s.activeMenuTab,
    }))
    void get().refreshSaveSlots()
  },

  openCompendium: (tab) => {
    set((s) => ({
      compendiumOpen: true,
      menuOpen: false,
      tooltip: null,
      saveNotice: null,
      activeCompendiumTab: tab ?? s.activeCompendiumTab,
    }))
  },

  closeCompendium: () => set({ compendiumOpen: false, saveNotice: null }),
  setCompendiumTab: (tab) => set({ activeCompendiumTab: tab, saveNotice: null }),

  openNpcDetailInCompendium: (npcId) => {
    set({
      inspectedNpcId: npcId,
      compendiumOpen: true,
      menuOpen: false,
      tooltip: null,
      saveNotice: null,
      activeCompendiumTab: 'portraits',
    })
  },

  closeMenu: () => set({ menuOpen: false, compendiumOpen: false, saveNotice: null }),
  setMenuTab: (tab) => {
    set({ activeMenuTab: tab, saveNotice: null })
    if (tab === 'save' || tab === 'load') {
      void get().refreshSaveSlots()
    }
  },

  buildSaveEnvelope: (slotId, note = '') => {
    const s = get()
    const st = extractSerializableState(s)
    const regionName = st.campPos
      ? `${NODE_MAP[st.campPos.u]?.name ?? st.campPos.u}—${NODE_MAP[st.campPos.v]?.name ?? st.campPos.v}旷野营地`
      : (NODE_MAP[st.activeRegionId]?.name ?? st.activeRegionId)
    const buildingName = st.activeBuildingInteriorId
      ? (BUILDING_DB_MAP[st.activeBuildingInteriorId]?.name ?? null)
      : null

    return {
      gameTitle: '北宋立志传',
      schemaVersion: CURRENT_SAVE_SCHEMA_VERSION,
      slotId,
      savedAt: new Date().toISOString(),
      note: note.trim(),
      summary: {
        songDate: formatSongDate(st.dayCount, st.shichenIdx),
        dayCount: st.dayCount,
        shichenIdx: st.shichenIdx,
        regionId: st.activeRegionId,
        regionName,
        viewMode: st.viewMode,
        buildingId: st.activeBuildingInteriorId,
        buildingName,
        hp: st.hp,
        maxHp: st.maxHp,
        mp: st.mp,
        maxMp: st.maxMp,
        combatExp: st.combatExp,
        silver: st.silver,
        food: st.food,
      },
      state: st,
    }
  },

  refreshSaveSlots: async () => {
    const slots = await listAllSaveEnvelopes()
    set({ saveSlots: slots })
  },

  saveToSlot: async (slotId, note = '', silent = false) => {
    if (!silent) {
      set({ saveBusy: true, saveNotice: null })
    }
    const envelope = get().buildSaveEnvelope(slotId, note)
    const backend = await putSaveEnvelope(envelope)
    const slots = await listAllSaveEnvelopes()
    if (silent) {
      set({ saveSlots: slots })
    } else {
      const backendLabel =
        backend === 'indexeddb'
          ? 'IndexedDB'
          : backend === 'localstorage'
            ? 'localStorage'
            : '会话内存 · 当前为无源沙箱环境，关闭页面前请点击【导出JSON】持久化保存'
      set({
        saveBusy: false,
        saveSlots: slots,
        saveNotice: {
          text: `已将当前江湖进度封入【${slotId === 'autosave' ? '自动卷宗' : slotId.toUpperCase()}】（存储引擎：${backendLabel}）。`,
          tone: 'success',
        },
      })
    }
  },

  loadFromEnvelope: (envelope, closeAfterLoad = true) => {
    const st = envelope.state
    const cleanBase = cloneHeroBaseStats(st.baseStats)
    const derived = deriveHeroEffectiveStats(
      cleanBase,
      st.equipped,
      st.equippedArts,
      st.learnedArts,
      { heavyInjury: Boolean(st.questState?.flags?.taihang_heavy_injury) },
    )
    const restoredLogs = [
      createLogEntry(
        st.dayCount,
        '卷宗启封',
        `已读取存档【${envelope.summary.songDate} · ${envelope.summary.regionName}${envelope.summary.buildingName ? ` · ${envelope.summary.buildingName}` : ''}】。`,
        true,
        st.shichenIdx,
      ),
      ...st.logs,
    ].slice(0, 60)

    set({
      ...st,
      characterCreated: st.characterCreated ?? true,
      playerName: st.playerName || '无名少侠',
      playerPortraitId: st.playerPortraitId || 'hero_04_swordsman',
      playerGender: st.playerGender ?? getProtagonistGender(st.playerPortraitId),
      playerAge: st.playerAge ?? 12,
      baseStats: cleanBase,
      mountKey: derived.mountKey,
      qinggongBonus: derived.qinggongBonus,
      ridingSkill: derived.ridingSkill,
      agility: derived.agility,
      combatExp: Math.max(0, Math.floor(st.combatExp ?? 0)),
      renown: Math.max(0, Math.floor(st.renown ?? 0)),
      chivalry: Math.floor(st.chivalry ?? 0),
      maxHp: derived.maxHp,
      hp: Math.min(derived.maxHp, st.hp),
      maxMp: derived.maxMp,
      mp: Math.min(derived.maxMp, st.mp),
      res: derived.res,
      skills: derived.skills,
      artExps: st.artExps ? { ...st.artExps } : {},
      artMilestoneFlags: Array.isArray(st.artMilestoneFlags)
        ? st.artMilestoneFlags.filter((x): x is string => typeof x === 'string')
        : [],
      consumedUniqueIds: st.consumedUniqueIds ?? [],
      consumedOnceItemIds: st.consumedOnceItemIds ?? [],
      npcFavor: st.npcFavor ? { ...st.npcFavor } : {},
      npcTalkedMonth: st.npcTalkedMonth ? { ...st.npcTalkedMonth } : {},
      npcSparredMonth: st.npcSparredMonth ? { ...st.npcSparredMonth } : {},
      npcBanquetedMonth: st.npcBanquetedMonth ? { ...st.npcBanquetedMonth } : {},
      inscribedPoemSpotIds: Array.isArray(st.inscribedPoemSpotIds)
        ? st.inscribedPoemSpotIds.filter((x): x is string => typeof x === 'string')
        : [],
      auctionBoughtByMonth: st.auctionBoughtByMonth
        ? Object.fromEntries(
            Object.entries(st.auctionBoughtByMonth).map(([k, arr]) => [k, [...arr]]),
          )
        : {},
      activeEscortContract: st.activeEscortContract ? { ...st.activeEscortContract } : null,
      sectState: clonePlayerSectState(st.sectState),
      questState: cloneQuestRuntimeState(st.questState),
      hiddenQuestIds: Array.isArray(st.hiddenQuestIds)
        ? st.hiddenQuestIds.filter((x): x is string => typeof x === 'string')
        : [],
      gameOver: null,
      birthplaceId: st.birthplaceId || st.currentNodeId || 'bianliang',
      cityStayShichens: Math.max(0, Math.floor(st.cityStayShichens ?? 0)) % 12,
      campPos: st.campPos ?? null,
      traveling: null,
      cultivationSession: null,
      activeCombat: null,
      activeStoryScene: null,
      activeNpcInteraction: null,
      tooltip: null,
      actionFeedback: null,
      logs: restoredLogs,
      compendiumOpen: false,
      menuOpen: !closeAfterLoad,
      saveNotice: closeAfterLoad
        ? null
        : {
            text: `已成功回溯至【${envelope.summary.songDate} · ${envelope.summary.regionName}】！`,
            tone: 'success',
          },
    })
  },

  removeSaveSlot: async (slotId) => {
    set({ saveBusy: true, saveNotice: null })
    await deleteSaveSlot(slotId)
    const slots = await listAllSaveEnvelopes()
    set({
      saveBusy: false,
      saveSlots: slots,
      saveNotice: {
        text: `已清空槽位【${slotId === 'autosave' ? '自动卷宗' : slotId.toUpperCase()}】。`,
        tone: 'success',
      },
    })
  },

  setSaveNotice: (notice) => set({ saveNotice: notice }),
})
